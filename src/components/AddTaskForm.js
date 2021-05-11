import React, { useReducer, useContext, useState } from "react";
import { Text, StyleSheet } from "react-native";

import { Input, Button } from "react-native-elements";
import SwitchComponent from "../components/SwitchComponent";

import { Context as AuthContext } from "../context/AuthContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "switch_day":
      if (action.payload === "Start") {
        return state.startTimeSwitch
          ? {
              ...state,
              startDaySwitch: false,
              startTimeSwitch: false,
            }
          : { ...state, startDaySwitch: !state.startDaySwitch };
      } else {
        return state.finishTimeSwitch
          ? { ...state, finishDaySwitch: false, finishTimeSwitch: false }
          : { ...state, finishDaySwitch: !state.finishDaySwitch };
      }
    case "switch_time":
      if (action.payload === "Start") {
        return state.startDaySwitch
          ? { ...state, startTimeSwitch: !state.startTimeSwitch }
          : state;
      } else {
        return state.finishDaySwitch
          ? { ...state, finishTimeSwitch: !state.finishTimeSwitch }
          : state;
      }
    default:
      return state;
  }
};

// AddTaskForm will be used for both Personal and Team
// so addTask must be assigned for suitable action
const AddTaskForm = ({ addTask, children }) => {
  // Context for action submit form
  const { state } = useContext(AuthContext);

  // State handle form value
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [finishTime, setFinishTime] = useState("");

  // Reducer for handle switch
  const [switchState, switchDispatch] = useReducer(reducer, {
    startDaySwitch: false,
    startTimeSwitch: false,
    finishDaySwitch: false,
    finishTimeSwitch: false,
  });

  return (
    <>
      <Text style={{ fontSize: 35 }}>Add Task Form</Text>
      <Input placeholder="Title" value={title} onChangeText={setTitle} />
      <Input placeholder="Details" value={details} onChangeText={setDetails} />
      {children}
      <SwitchComponent
        name="Start"
        state={{ switchState, startDate, startTime }}
        dispatch={{ switchDispatch, setStartDate, setStartTime }}
      />
      <SwitchComponent
        name="Finish"
        state={{ switchState, finishDate, finishTime }}
        dispatch={{ switchDispatch, setFinishDate, setFinishTime }}
      />
      <Button
        title="Add Task"
        disabled={
          !Object.values(switchState).includes(false) &&
          title.replace(/\s/g, "").length
            ? false
            : true
        }
        onPress={() => {
          addTask(
            title,
            details,
            startDate,
            startTime,
            finishDate,
            finishTime,
            (username = state.username)
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default AddTaskForm;
