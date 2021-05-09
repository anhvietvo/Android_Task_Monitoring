import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";

import axios from "../api/axios";
import _ from "lodash";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTeam":
      // Check TID is already existed in state or not
      return state.some((team) => team.TID === action.payload.TID)
        ? [...state]
        : [
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

// TODO: Load team from table Employees after
const loadTeam = (dispatch) => {
  return async (username) => {
    try {
      const res = await axios.post("/team", {
        username,
      });
      // Only check manager in Teams-schema not check in employees yet
      //res.data.filter(item => _.find(state, item))
      res.data.map((team) => {
        dispatch({
          type: "addTeam",
          payload: {
            TID: team.TID,
            name: team.name,
            details: team.details,
            manager: team.manager,
          },
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  reducer,
  { addTeam, loadTeam },
  []
);
