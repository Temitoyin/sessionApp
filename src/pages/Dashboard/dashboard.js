import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { persistState, setPresence } from "../../redux/Auth/authSlice";
import { useDispatch } from "react-redux";
import Navigation from "../../components/Navigation/navigation";
import UserList from "../../components/UserList/userList";
import styles from "./dashboard.module.scss";
export default function Dashboard() {
  const navigate = useNavigate();
  const [usserName, setUserName] = useState("");
  const [updateMade, setUpdateMade] = useState("false");
  const [sessionupdateMade, setSessionUpdateMade] = useState("false");

  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();

  let updates;
  let sessionUpdate;
  let userName = useRef();
  setInterval(() => {
    updates = localStorage.getItem("updateMade");
    sessionUpdate = sessionStorage.getItem("updateMade");
    if (updates !== updateMade) {
      setUpdateMade(updates);
    }
    if (sessionUpdate !== sessionupdateMade) {
      setSessionUpdateMade(sessionUpdate);
    }
  }, 5000);
  const updateValue = updateMade === "true";
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      userName.current = sessionStorage.getItem("sessionId");
      const allLoggedInUsers = JSON.parse(localStorage.getItem("allusers"));
      if (userName.current) {
        setUserName(userName.current);
        document.title = userName.current;
        const currentUser = allLoggedInUsers[`${userName.current}`];
        dispatch(persistState(currentUser));
        window.name = userName.current;
      } else if (allLoggedInUsers) {
        const userList = Object.keys(allLoggedInUsers);
        const last = userList[userList.length - 1];
        setUserName(last);
        document.title = last;
        window.name = last;
      } else if (usserName === "" || usserName === undefined) {
        navigate("/login");
      }
      allLoggedInUsers && setAllUsers(Object.entries(allLoggedInUsers));
    }

    return () => {
      mounted = false;
    };
  }, [updateValue, sessionupdateMade, dispatch, navigate, usserName]);
  useEffect(() => {
    if (usserName === undefined) {
      navigate("/login");
    }
  }, [usserName, navigate]);
  useEffect(() => {
    const allLoggedInUsers = JSON.parse(localStorage.getItem("allusers"));
    const currentUser =
      allLoggedInUsers && allLoggedInUsers[`${userName.current}`];
    if (currentUser || usserName) {
      window.addEventListener("visibilitychange", function (event) {
        if (document.visibilityState === "visible") {
          dispatch(
            setPresence({
              name: (currentUser && currentUser.userName) || usserName,
              status: "active",
            })
          );
        }
        setTimeout(() => {
          if (document.hidden) {
            dispatch(
              setPresence({
                name: (currentUser && currentUser.userName) || usserName,
                status: "inactive",
              })
            );
          } else {
            dispatch(
              setPresence({
                name: (currentUser && currentUser.userName) || usserName,
                status: "active",
              })
            );
          }
        }, 30000);
      });
    }
  }, [usserName, dispatch]);
  return (
    <div>
      <Navigation userName={usserName} />
      <div className={styles.userList}>
        <UserList users={allUsers} />
      </div>
    </div>
  );
}
