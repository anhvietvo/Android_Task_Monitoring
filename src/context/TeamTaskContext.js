import createDataContext from "./createDataContext";

const reducer = (state, action) => {
  switch (action.type) {
    //case "addUser":
      //return
    //case "addUserMsg":
      //return [...state, { msg: action.payload }];
    //case "clearMsg":
      //return;
    default:
      return state;
  }
};

// TODO: Initialize add team task
const addTask = (dispatch) => {
  return;
}

//const addUser = (dispatch) => {
  //return async (username) => {
    //try {
      //const res = await axios.post("/team/user", { username });
      //if (res.data.length) {
        //dispatch({ type: "addUserMsg", payload: "A new user is added" });
      //} else {
        //dispatch({
          //type: "addUserMsg",
          //payload: "This username does not exist",
        //});
      //}
    //} catch (err) {
      //console.log(err);
    //}
  //};
//};

//const clearMsg = (dispatch) => {
  //return dispatch({ type: "clearMsg" });
//};

export const { Provider, Context } = createDataContext(
  reducer,
  { addTask },
  []
);
