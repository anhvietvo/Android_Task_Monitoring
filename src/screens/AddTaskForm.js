import React, { useReducer } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Input, Switch, Button } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const reducer = (state, action) => {
  switch (action.type) {
    case "switch_day":
      return state.timeSwitch
        ? { daySwitch: false, timeSwitch: false }
        : { ...state, daySwitch: !state.daySwitch };
    case "switch_time":
      return state.daySwitch ? { ...state, timeSwitch: !state.timeSwitch } : state;
    default:
      return state;
  }
};

const AddTaskForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    daySwitch: false,
    timeSwitch: false,
  });

  return (
    <>
      <Text style={{ fontSize: 45 }}>Add Task Form</Text>
      <Input placeholder="Title" />
      <Input placeholder="Details" />
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Fontisto name="date" style={styles.icon} />
          <Text style={styles.txt}>Date</Text>
          <Switch
            value={state.daySwitch}
            onValueChange={() => dispatch({ type: "switch_day" })}
          />
        </View>
        {state.daySwitch && !state.timeSwitch && <Calendar />}
        <View style={styles.switchContainer}>
          <Ionicons name="time-outline" style={styles.icon} />
          <Text style={styles.txt}>Time</Text>
          <Switch
            value={state.timeSwitch}
            onValueChange={() => dispatch({ type: "switch_time" })}
          />
        </View>
        {state.timeSwitch && (
          <DateTimePicker
            style={{ marginBottom: 20, alignSelf: "flex-end", width: 70 }}
            mode="time"
            value={new Date()}
          />
        )}
        <Button title="Add Task" />
      </View>
    </>
  );
};

AddTaskForm.navigationOptions = () => {
  return {
    title: "Add Task",
  };
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  switchContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  txt: {
    fontSize: 20,
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
    color: "#2054d8",
  },
});

export default AddTaskForm;
