import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTeam":
      return [
        ...state,
        {
          TID: action.payload.TID,
          name: action.payload.name,
          details: action.payload.details,
        },
      ];
    default:
      return state;
  }
};

const addTeam = (dispatch) => {
  return (name, details) => {
    TID = Math.round(Math.random() * 99999);
    dispatch({ type: "addTeam", payload: { TID, name, details } });
    navigate("ManageTeams");
  };
};

export const { Provider, Context } = createDataContext(
  reducer,
  { addTeam },
  []
);
