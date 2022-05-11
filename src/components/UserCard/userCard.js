import React from "react";
import { logoutOtherUser } from "../../redux/Auth/authSlice";
import { useDispatch } from "react-redux";
import styles from "./userCard.module.scss";

const UserCard = ({ user }) => {
  let sessionUser = user && user[1];
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutOtherUser(sessionUser.userName));
  };
  return (
    <div className={styles.userCard}>
      <div className={styles.userCard_text}>
        <h1>{sessionUser.userName}</h1>
      </div>
      <div className={styles.userCard__status}>
        <p
          className={
            sessionUser.status === "active" ? styles.open : styles.close
          }
        >
          {sessionUser.status}
        </p>
      </div>
      <div className={styles.userCard__more}>
        <button onClick={(e) => handleLogout(e)}>Logout</button>
      </div>
    </div>
  );
};

export default UserCard;
