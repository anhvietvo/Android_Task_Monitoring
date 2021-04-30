import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";

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
              //id: Math.round(Math.random() * 99999),
              title: action.payload.title,
              details: action.payload.details,
              startDate: action.payload.startDate,
              startTime: action.payload.startTime,
              finishDate: action.payload.finishDate,
              finishTime: action.payload.finishTime,
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
        : [...state, { title: action.payload, data: [{}] }]
    default:
      return state;
  }
};

const addTask = (dispatch) => {
  return (title, details, startDate, startTime, finishDate, finishTime) => {
    dispatch({
      type: "addTask",
      payload: { title, details, startDate, startTime, finishDate, finishTime },
    });
    navigate("Personal");
  };
};

const addEmpty = (dispatch) => {
  return (date) => {
    dispatch({ type: "addEmpty", payload: date });
  };
};

export const { Provider, Context } = createDataContext(
  reducer,
  { addTask, addEmpty },
  []
);
