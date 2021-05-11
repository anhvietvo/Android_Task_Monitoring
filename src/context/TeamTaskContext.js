import createDataContext from "./createDataContext";

import axios from "../api/axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "setCheck":
      state.employees.map((user) => {
        if (user.username === action.payload) {
          user.check = !user.check;
        }
        return user;
      });
      return { ...state };
    case "loadUser":
      // Clear employees before load from db
      state.employees = [];
      action.payload.map((user) => {
        state.employees.push({ username: user.username, check: false });
      });
      return { ...state };
    case "addMsg":
      return { ...state, msg: action.payload };
    case "clearMsg":
      return { ...state, msg: "" };
    default:
      return state;
  }
};

const clearMsg = (dispatch) => () => {
  dispatch({ type: "clearMsg" });
};

// TODO: Initialize add team task
const addTask = (dispatch) => {
  return;
};

const addUser = (dispatch) => {
  return async (username, TID) => {
    try {
      const res = await axios.post("/team/user", { username, TID });
      console.log(res.data);
      dispatch({ type: "addMsg", payload: "Add succesfully" });
      // After add re-load array of employees
      loadUser(TID);
    } catch (err) {
      dispatch({
        type: "addMsg",
        payload: "Username does not exist or has been added before",
      });
    }
  };
};

const loadUser = (dispatch) => {
  return async (TID) => {
    try {
      const res = await axios.post("team/employees", { TID });
      //console.log(res.data);
      dispatch({ type: "loadUser", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
};

const setCheck = (dispatch) => {
  return (username) => {
    dispatch({ type: "setCheck", payload: username });
  };
};

export const { Provider, Context } = createDataContext(
  reducer,
  { addTask, addUser, clearMsg, loadUser, setCheck },
  { msg: "", employees: [], task: [] }
);
