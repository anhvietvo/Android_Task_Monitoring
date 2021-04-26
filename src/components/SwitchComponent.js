import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Switch } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SwitchComponent = ({ name, state, dispatch }) => {
  const [date, setDate] = useState("");
  var daySwitch, timeSwitch;
  switch (name) {
    case "Start":
      daySwitch = state.startDaySwitch;
      timeSwitch = state.startTimeSwitch;
      break;
    case "Finish":
      daySwitch = state.finishDaySwitch;
      timeSwitch = state.finishTimeSwitch;
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Fontisto name="date" style={styles.icon} />
        <Text style={styles.txt}>{name} Date</Text>
        <Switch
          value={daySwitch}
          onValueChange={() => dispatch({ type: "switch_day", payload: name })}
        />
      </View>
      {daySwitch && !timeSwitch && <Calendar />}
      {timeSwitch && <Text>Day is choosed</Text>}
      <View style={styles.switchContainer}>
        <Ionicons name="time-outline" style={styles.icon} />
        <Text style={styles.txt}>{name} Time</Text>
        <Switch
          value={timeSwitch}
          onValueChange={() => dispatch({ type: "switch_time", payload: name })}
        />
      </View>
      {timeSwitch && (
        <DateTimePicker
          style={{ marginBottom: 20, alignSelf: "flex-end", width: 70 }}
          mode="time"
          value={new Date()}
        />
      )}
    </View>
  );
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

export default SwitchComponent;
