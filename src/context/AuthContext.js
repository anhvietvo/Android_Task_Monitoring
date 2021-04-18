import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispath) => {
  return ({ fullname, username, password }) => {
    // make api request to signup
    
    // signup successsful
    
    // signup fail
  }
}

const signin = (dispath) => {
  return ({ username, password }) => {
    // signin
    
    // signin success

    // signin fail
  }
}

const signout = (dispath) => {
  return () => {
    // signout
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  {signin, signout, signup},
  { isSignedIn: false }
);
