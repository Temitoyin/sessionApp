import React, { useEffect, useState } from "react";
import styles from "./userCard.module.scss";

const UserCard = ({ user }) => {
  const status = "active";
  let sessionUser = user && user[1];
  useEffect(() => {
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
            fill="#8798AD"
          />
          <path
            d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z"
            fill="#8798AD"
          />
          <path
            d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
            fill="#8798AD"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserCard;
