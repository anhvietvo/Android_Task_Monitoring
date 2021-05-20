import createDataContext from "./createDataContext";

import axios from "../api/axios";
import { navigate } from "../navigationRef";

import _ from "lodash";

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
                allocateList: action.payload.allocateList,
              },
            ],
          },
        ],
      };
    case "addEmpty":
      var checkHasEmpty = false;
      const changeEmptyElement = state.task.map((task) => {
        if (_.isEmpty(task.data[0])) {
          checkHasEmpty = true;
          return {
            title: action.payload,
            data: [{}],
          };
        }
        return task;
      });
      return checkHasEmpty
        ? {
            ...state,
            task: changeEmptyElement,
          }
        : {
            ...state,
            task: [
              ...state.task,
              {
                title: action.payload,
                data: [{}],
              },
            ],
          };
    case "clearEmpty":
      return {
        ...state,
        task: state.task.filter((task) => !_.isEmpty(task.data[0])),
      };
    case "updateStatus":
      state.task.map((day) => {
        day.data.map((task) => {
          task.TTID === action.payload.TTID
            ? (task.status = action.payload.status)
            : task;
        });
      });
      return { ...state };
    case "deleteTask":
      state.task.forEach((item) => {
        const taskData = item.data.filter(
          (task) => task.TTID !== action.payload
        );
        item.data = taskData.length ? taskData : [{}];
      });
      return { ...state };
    case "setCheck":
      state.employees.map((user) => {
        if (user.username === action.payload) {
          user.check = !user.check;
        }
        return user;
      });
      return { ...state };
    case "loadUser":
      // Clear smployees before load from db
      state.employees = [];
      action.payload.map((user) => {
        state.employees.push({ username: user.username, UID: user.UID, check: false });
      });
      return { ...state };
    case "addMsg":
      return { ...state, msg: action.payload };
    case "clearMsg":
      return { ...state, msg: "" };
    case "clearTask":
      return { ...state, task: [] };
    default:
      return state;
  }
};

const clearMsg = (dispatch) => () => {
  dispatch({ type: "clearMsg" });
};

// Load Task from db to TeamTaskScreen
const loadTask = (dispatch) => {
  return async (UID, TID, manager) => {
    dispatch({ type: "clearTask" });
    try {
      const res =
        UID === manager
          ? await axios.post("/team/task", { TID })
          : await axios.post("/team/task", { UID, TID });
      return res.data.map(async (row) => {
        // Get the array of username who do this task
        const allocateList = await axios.post("/team/task/getAllocate", {
          TTID: row.TTID,
        });
        var allocateStr = "";
        allocateList.data.map((user) => (allocateStr += user.username + "  "));
        return dispatch({
          type: "addTask",
          payload: {
            ...row,
            startDate: row.startDate.slice(0, 10),
            startTime: row.startTime.slice(0, 5),
            finishDate: row.finishDate.slice(0, 10),
            finishTime: row.finishTime.slice(0, 5),
            allocateList: allocateStr,
          },
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
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
        TID: owner.TID,
        title,
        details,
        startDate,
        startTime,
        finishDate,
        finishTime,
        status,
      });
      console.log(res.data);
      // Check this task is belong to user who added or not
      var taskBelongsToAdder = false;
      // Create the string of users who are allocated this task
      var allocateList = "";
      await checkStatus.map((user) => {
        axios.post("/team/task/allocate", {
          TTID,
          UID: user.UID,
        });
        if (user.username === owner.username) {
          taskBelongsToAdder = true;
        }
        allocateList += user.username + "  ";
      });
      if (taskBelongsToAdder || owner.UID === owner.manager) {
        dispatch({
          type: "addTask",
          payload: {
            TTID,
            TID: owner.TID,
            title,
            details,
            startDate,
            startTime,
            finishDate,
            finishTime,
            status,
            allocateList: allocateList,
          },
        });
      }
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

const addEmpty = (dispatch) => {
  return (date) => {
    dispatch({ type: "addEmpty", payload: date });
  };
};

const clearEmpty = (dispatch) => {
  return () => {
    dispatch({ type: "clearEmpty" });
  };
};

const updateStatus = (dispatch) => {
  return async (TTID, status) => {
    try {
      const res = await axios.post("/team/task/edit", { TTID, status });
      console.log(res.data);

      dispatch({ type: "updateStatus", payload: { TTID, status } });
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteTask = (dispatch) => {
  return async (TTID) => {
    // Delete from db
    try {
      const res = await axios.post("/team/task/delete", { TTID });
      console.log(res.data);
      // Delete from state
      dispatch({ type: "deleteTask", payload: TTID });
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
  {
    addTask,
    addUser,
    clearMsg,
    loadUser,
    setCheck,
    addEmpty,
    clearEmpty,
    loadTask,
    updateStatus,
    deleteTask,
  },
  { msg: "", employees: [], task: [] }
);
