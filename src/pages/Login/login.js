import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userName, login, isLoggedIn } from "../../redux/Auth/authSlice";
import backgroundImg from "../../assets/background1.png";
import styles from "./login.module.scss";
const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const isAuthenticated = useSelector(isLoggedIn);
  const storeUserName = useSelector(userName);

  const [usserName, setUserName] = useState("");

  useEffect(() => {
    let mounted = true;
    mounted &&
      storeUserName === sessionStorage.getItem("sessionId") &&
      history(`/dashboard/${storeUserName}`);
    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(usserName));
  };

  return (
    <div>
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.signIn}>
            <div className={styles.signIn__logo}>
              {/* <Icon name="logo" /> */}
            </div>
            <div className={styles.signIn__header}>
              <h1>Sign In</h1>
            </div>
            <div className={styles.signIn__form}>
              <form>
                <div className={styles.signIn__form_input}>
                  <label htmlFor="text">userName</label>
                  <input
                    type="text"
                    name="text"
                    value={usserName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className={styles.signIn__form_button}>
                  <button onClick={(e) => handleLogin(e)}>Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <img src={backgroundImg} alt="blue patterned Img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
