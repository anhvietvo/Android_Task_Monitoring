import createDataContext from "./createDataContext";
import axios from "../api/axios";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_err":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signin = (dispath) => {
  return async ({ username, password }) => {
    // make api request to signup
    try {
      const res = await axios.post("/signin", { username, password });
      console.log(res.data);
    } catch (err) {
      dispath({ type: "add_err", payload: "Something went wrong with log in" });
    }

    // signup successsful

    // signup fail
  };
};

const signup = (dispath) => {
  return ({ username, password }) => {
    // signin
    // signin success
    // signin fail
  };
};

const signout = (dispath) => {
  return () => {
    // signout
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { isSignedIn: false, errorMessage: "" }
);
