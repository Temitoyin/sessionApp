import React, { useState, useEffect } from "react";
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
  const [users, setUsers] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();

  let updates;
  let userName;
  setInterval(() => {
    updates = localStorage.getItem("updateMade");
    if (updates !== updateMade) {
      setUpdateMade(updates);
    }
  }, 3000);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      userName = sessionStorage.getItem("sessionId");
      const allLoggedInUsers = JSON.parse(localStorage.getItem("allusers"));
      if (userName) {
        setUserName(userName);
        document.title = userName;
        const currentUser = allLoggedInUsers[`${userName}`];
        dispatch(persistState(currentUser));
        window.name = userName;
      } else if (allLoggedInUsers) {
        const userList = Object.keys(allLoggedInUsers);
        setUsers(userList);
        const last = userList[userList.length - 1];
        setUserName(last);
        document.title = userName;
        window.name = userName;
      } else if (usserName === "" || usserName === undefined) {
        navigate("/login");
      }
      allLoggedInUsers && setAllUsers(Object.entries(allLoggedInUsers));
    }

    return () => {
      mounted = false;
    };
  }, [updateMade === "true"]);
  useEffect(() => {
    if (usserName === undefined) {
      navigate("/login");
    }
  }, [usserName]);
  return (
    <div>
      <Navigation userName={usserName} />
      <div className={styles.userList}>
        <UserList users={allUsers} />
      </div>
    </div>
  );
}
