import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import axios from "../api/axios";
import _ from "lodash";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTask":
      for (let i = 0; i < state.length; i++) {
        if (state[i].title === action.payload.finishDate) {
          // Check have empty  before or not
          if (_.isEmpty(state[i].data[0])) {
            state[i].data[0] = action.payload;
          } else {
            state[i].data.push(action.payload);
          }
          return [...state];
        }
      }
      return [
        ...state,
        {
          title: action.payload.finishDate,
          data: [
            {
              PTID: action.payload.PTID,
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
      ];
    case "addEmpty":
      var checkHasEmpty = false;
      const changeEmptyElement = state.map((task) => {
        if (_.isEmpty(task.data[0])) {
          checkHasEmpty = true;
          return { title: action.payload, data: [{}] };
        }
        return task;
      });
      return checkHasEmpty
        ? changeEmptyElement
        : [...state, { title: action.payload, data: [{}] }];
    case "updateStatus":
      state.map((day) => {
        day.data.map((task) => {
          task.PTID === action.payload.PTID
            ? (task.status = action.payload.status)
            : task;
        });
      });
      return [...state];
    case "deleteTask":
      state.forEach((item) => {
        const taskData = item.data.filter(
          (task) => task.PTID !== action.payload
        );
        item.data = taskData.length ? taskData : [{}];
      });
      return [...state];
    case "clearTask":
      return [];
    default:
      return state;
  }
};

const addTask = (dispatch) => {
  return async (
    title,
    details,
    startDate,
    startTime,
    finishDate,
    finishTime,
    owner
    //username
  ) => {
    try {
      const PTID = Math.round(Math.random() * 99999);
      const status = 0;
      const res = await axios.post("/personal/add", {
        PTID,
        title,
        details,
        startDate,
        startTime,
        finishDate,
        finishTime,
        status,
        owner
        //username,
      });
      console.log(res.data);
      dispatch({
        type: "addTask",
        payload: {
          PTID,
          title,
          details,
          startDate,
          startTime,
          finishDate,
          finishTime,
          status,
        },
      });
      navigate("Personal");
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

const updateStatus = (dispatch) => {
  return async (PTID, status) => {
    try {
      const res = await axios.post("/personal/edit", { PTID, status });
      console.log(res.data);

      dispatch({ type: "updateStatus", payload: { PTID, status } });
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteTask = (dispatch) => {
  return async (PTID) => {
    // Delete from db
    try {
      const res = await axios.post("/personal/delete", { PTID });
      console.log(res.data);
      // Delete from state
      dispatch({ type: "deleteTask", payload: PTID });
    } catch (err) {
      console.log(err);
    }
  };
};

const loadTask = (dispatch) => {
  return async (UID) => {
    dispatch({ type: "clearTask" });
    try {
      const res = await axios.post("/personal", { UID });
      return res.data.map((row) => {
        return dispatch({
          type: "addTask",
          payload: {
            ...row,
            startDate: row.startDate.slice(0, 10),
            startTime: row.startTime.slice(0, 5),
            finishDate: row.finishDate.slice(0, 10),
            finishTime: row.finishTime.slice(0, 5),
          },
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const clearTask = (dispatch) => {
  return () => dispatch({ type: "clearTask" });
};

export const { Provider, Context } = createDataContext(
  reducer,
  { addTask, addEmpty, updateStatus, loadTask, deleteTask, clearTask },
  []
);
