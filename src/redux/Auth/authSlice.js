import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userName: "",
  status: "active",
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      const currentloggedInUsers = JSON.parse(localStorage.getItem("users"));
      const currentUsersData = JSON.parse(localStorage.getItem("allusers"));
      let users;
      if (currentUsersData) {
        currentUsersData[`${action.payload}`] = {
          userName: action.payload,
          status: "active",
          loggedIn: true,
        };
        localStorage.setItem("allusers", JSON.stringify(currentUsersData));
        sessionStorage.setItem("allusers", JSON.stringify(currentUsersData));
        users = [...currentloggedInUsers, action.payload];
      } else {
        localStorage.setItem("allusers", JSON.stringify({}));
        sessionStorage.setItem("allusers", JSON.stringify({}));
        let userData = JSON.parse(localStorage.getItem("allusers"));
        userData[`${action.payload}`] = {
          userName: action.payload,
          status: "active",
          loggedIn: true,
        };
        users = [action.payload];
        localStorage.setItem("allusers", JSON.stringify(userData));
        sessionStorage.setItem("allusers", JSON.stringify(userData));
      }
      localStorage.setItem("logedInUser", action.payload);
      localStorage.setItem("updateMade", "true");
      localStorage.setItem("users", JSON.stringify(users));
      sessionStorage.setItem("sessionId", action.payload);
      sessionStorage.setItem("updateMade", "true");
      state.userName = action.payload;
      state.status = "active";
      state.loggedIn = true;

      setTimeout(() => {
        localStorage.setItem("updateMade", "false");
        sessionStorage.setItem("updateMade", "false");
      }, 4000);
    },
    persistState: (state, action) => {
      state.userName = action.payload.userName;
      state.status = action.payload.status;
      state.loggedIn = action.payload.loggedIn;
    },
    logout: (state, action) => {
      sessionStorage.removeItem("sessionId");
      localStorage.removeItem("logedInUser");
      let userData = JSON.parse(localStorage.getItem("allusers"));
      delete userData[`${action.payload}`];
      localStorage.setItem("allusers", JSON.stringify(userData));
      sessionStorage.setItem("allusers", JSON.stringify(userData));
      localStorage.setItem("users", JSON.stringify(Object.keys(userData)));
      localStorage.setItem("updateMade", "true");
      state.loggedIn = false;
      state.userName = "";
      setTimeout(() => {
        localStorage.setItem("updateMade", "false");
      }, 4000);
    },
    setPresence: (state, action) => {
      let userData = JSON.parse(localStorage.getItem("allusers"));
      userData[`${action.payload.name}`].status = action.payload.status;
      localStorage.setItem("allusers", JSON.stringify(userData));
      localStorage.setItem("allusers", localStorage.getItem("allusers"));
      sessionStorage.setItem("updateMade", "true");
      setTimeout(() => {
        sessionStorage.setItem("updateMade", "false");
      }, 4000);
    },
  },
});

export const { login, logout, persistState, setPresence } = authSlice.actions;
export const isLoggedIn = (state) => state.auth.loggedIn;
export const userName = (state) => state.auth.userName;
export default authSlice.reducer;
