import React, { useState, useReducer } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Input, Switch, Button } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AddTaskForm = () => {
  const [daySwitch, setDaySwitch] = useState(false);
  const [timeSwitch, setTimeSwitch] = useState(false);

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
            value={daySwitch}
            onValueChange={() => setDaySwitch(!daySwitch)}
          />
        </View>
        {daySwitch && !timeSwitch && <Calendar />}
        <View style={styles.switchContainer}>
          <Ionicons name="time-outline" style={styles.icon} />
          <Text style={styles.txt}>Time</Text>
          <Switch
            value={timeSwitch}
            onValueChange={() => {
              if (daySwitch) {
                setTimeSwitch(!timeSwitch);
              }
            }}
          />
        </View>
        {timeSwitch && (
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
