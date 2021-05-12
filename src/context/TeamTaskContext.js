import createDataContext from "./createDataContext";

import axios from "../api/axios";
import { navigate } from "../navigationRef";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTask":
      for (let i = 0; i < state.task.length; i++) {
        if (state.task[i].title === action.payload.finishDate) {
          // Check have empty  before or not
          if (_.isEmpty(state.task[i].data[0])) {
            state.task[i].data[0] = action.payload;
          } else {
            state.task[i].data.push(action.payload);
          }
          return { ...state };
        }
      }
      return {
        ...state,
        task: [
          ...state.task,
          {
            title: action.payload.finishDate,
            data: [
              {
                TTID: action.payload.TTID,
                TID: action.payload.TID,
                title: action.payload.title,
                details: action.payload.details,
                startDate: action.payload.startDate,
                startTime: action.payload.startTime,
                finishDate: action.payload.finishDate,
                finishTime: action.payload.finishTime,
                status: action.payload.status,
              },
            ],
          },
        ],
      };
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
  return async (
    //TID,
    title,
    details,
    startDate,
    startTime,
    finishDate,
    finishTime,
    owner,
    checkStatus
  ) => {
    try {
      const TTID = Math.round(Math.random() * 99999);
      const status = 0;
      const res = await axios.post("/team/task/add", {
        TTID,
        TID: owner,
        title,
        details,
        startDate,
        startTime,
        finishDate,
        finishTime,
        status,
      });
      console.log(res.data);
      await checkStatus.map((user) => {
        axios.post("/team/task/allocate", {
          TTID,
          username: user.username,
        });
      });
      dispatch({
        type: "addTask",
        payload: {
          TTID,
          TID: owner,
          title,
          details,
          startDate,
          startTime,
          finishDate,
          finishTime,
          status,
        },
      });
      // Reset check state to false
      checkStatus.map((user) =>
        dispatch({ type: "setCheck", payload: user.username })
      );
      navigate("TeamTask");
    } catch (err) {
      console.log(err);
    }
  };
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
  { addTask, addUser, clearMsg, loadUser, setCheck, addTask },
  { msg: "", employees: [], task: [] }
);
