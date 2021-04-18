import createDataContext from "./createDataContext";
import axios from "../api/axios";

import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_err":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return async ({ username, password }) => {
    // make api request to signup
    try {
      const res = await axios.post("/signin", { username, password });
      console.log(res.data);
    } catch (err) {
      dispatch({
        type: "add_err",
        payload: "Something went wrong with log in",
      });
    }
  };
};

const signup = (dispatch) => async ({ fullname, username, password }) => {
  // signin
  try {
    const res = await axios.post("/signup", { fullname, username, password });
    console.log(res.data);
    // Store jwt to device
    await AsyncStorage.setItem("token", res.data.token);
    dispatch({ type: "signup", payload: res.data.token });
  } catch (err) {
    dispatch({ type: "add_err", payload: "Something went wrong with sign up" });
  }
};

const signout = (dispatch) => {
  return () => {
    // signout
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: "" }
);
