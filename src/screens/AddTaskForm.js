import React, { useReducer } from "react";
import { Text, ScrollView } from "react-native";

import { Input, Button } from "react-native-elements";
import SwitchComponent from "../components/SwitchComponent";
import _ from "lodash";

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

const AddTaskForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    startDaySwitch: false,
    startTimeSwitch: false,
    finishDaySwitch: false,
    finishTimeSwitch: false,
  });

  return (
    <ScrollView>
      <Text style={{ fontSize: 45 }}>Add Task Form</Text>
      <Input placeholder="Title" />
      <Input placeholder="Details" />
      <SwitchComponent name="Start" state={state} dispatch={dispatch} />
      <SwitchComponent name="Finish" state={state} dispatch={dispatch} />
      {Object.values(state).includes(false) ? (
        <Button disabled title="Add Task" />
      ) : (
        <Button title="Add Task" />
      )}
    </ScrollView>
  );
};

AddTaskForm.navigationOptions = () => {
  return {
    title: "Add Task",
  };
};

export default AddTaskForm;
