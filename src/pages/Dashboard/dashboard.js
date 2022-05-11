import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { persistState } from "../../redux/Auth/authSlice";

import { useDispatch } from "react-redux";
import Navigation from "../../components/Navigation/navigation";
import UserList from "../../components/UserList/userList";
import styles from "./dashboard.module.scss";
export default function Dashboard() {
  const navigate = useNavigate();
  const [usserName, setUserName] = useState("");
  const [updateMade, setUpdateMade] = useState("false");
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();

  let updates;
  let userName = useRef();
  setInterval(() => {
    updates = localStorage.getItem("updateMade");
    if (updates !== updateMade) {
      setUpdateMade(updates);
    }
  }, 3000);
  const updateValue = updateMade === "true";
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      userName.current = sessionStorage.getItem("sessionId");
      const allLoggedInUsers = JSON.parse(localStorage.getItem("allusers"));
      if (userName) {
        setUserName(userName.current);
        document.title = userName.current;
        const currentUser = allLoggedInUsers[`${userName.current}`];
        dispatch(persistState(currentUser));
        window.name = userName.current;
      } else if (allLoggedInUsers) {
        const userList = Object.keys(allLoggedInUsers);
        const last = userList[userList.length - 1];
        setUserName(last);
        document.title = userName.current;
        window.name = userName.current;
      } else if (usserName === "" || usserName === undefined) {
        navigate("/login");
      }
      allLoggedInUsers && setAllUsers(Object.entries(allLoggedInUsers));
    }

    return () => {
      mounted = false;
    };
  }, [updateValue, dispatch, navigate, usserName]);
  useEffect(() => {
    if (usserName === undefined) {
      navigate("/login");
    }
  }, [usserName, navigate]);

  return (
    <div>
      <Navigation userName={usserName} />
      <div className={styles.userList}>
        <UserList users={allUsers} />
      </div>
    </div>
  );
}
