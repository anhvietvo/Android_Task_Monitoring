import createDataContext from "./createDataContext";

import axios from "../api/axios";

const reducer = (state, action) => {
  switch (action.type) {
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
    } catch (err) {
      dispatch({
        type: "addMsg",
        payload: "Username does not exist or has been added before",
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  reducer,
  { addTask, addUser, clearMsg },
  { msg: "", task: [] }
);
