import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTask":
      for (let i = 0; i < state.length; i++) {
        if (state[i].title === action.payload.finishDate) {
          state[i].data.push(action.payload);
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

export const { Provider, Context } = createDataContext(
  reducer,
  { addTask },
  []
);
