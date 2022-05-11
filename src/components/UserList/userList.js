import React from "react";
import UserCard from "../UserCard/userCard";
import styles from "./userList.module.scss";
const UserList = ({ users }) => {
  return (
    <div className={styles.userList}>
      <div className={styles.userList__heading}>
        <h1>All Users</h1>
        <div className={styles.userList__select}>
          <select>
            <option>All</option>
          </select>
        </div>
      </div>
      <div className={styles.userList__main}>
        <div className={styles.header}>
          <p className={styles.header__title}>User</p>
          <p className={styles.header__status}>Status</p>
          <p className={styles.header__actions}>Actions</p>
        </div>
        <div className={styles.userList__main_list}>
          {users.map((e, i) => (
            <UserCard user={e} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
