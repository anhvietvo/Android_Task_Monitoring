import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";

import axios from "../api/axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTeam":
      return [
        ...state,
        {
          TID: action.payload.TID,
          name: action.payload.name,
          details: action.payload.details,
          manager: action.payload.manager,
        },
      ];
    default:
      return state;
  }
};

const addTeam = (dispatch) => {
  return async (name, details, manager) => {
    try {
      // Generate ID for each team
      TID = Math.round(Math.random() * 99999);
      // Add team to database
      const res = await axios.post("/team/add", {
        TID,
        name,
        details,
        manager,
      });
      console.log(res.data);
      dispatch({ type: "addTeam", payload: { TID, name, details, manager } });
      navigate("ManageTeams");
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  reducer,
  { addTeam },
  []
);
