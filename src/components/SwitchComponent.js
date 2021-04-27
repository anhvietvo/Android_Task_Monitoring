import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Switch } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SwitchComponent = ({ name, state, dispatch }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [show, setShow] = useState(false);

  var time, setTime, date, setDate;
  var daySwitch, timeSwitch;
  switch (name) {
    case "Start":
      daySwitch = state.switchState.startDaySwitch;
      timeSwitch = state.switchState.startTimeSwitch;
      time = state.startTime;
      setTime = dispatch.setStartTime;
      date = state.startDate;
      setDate = dispatch.setStartDate;
      break;
    case "Finish":
      daySwitch = state.switchState.finishDaySwitch;
      timeSwitch = state.switchState.finishTimeSwitch;
      time = state.finishTime;
      setTime = dispatch.setFinishTime;
      date = state.finishDate;
      setDate = dispatch.setFinishDate;
      break;
  }

  const setNewDaySelected = (date) => {
    const markedDate = Object.assign({});
    markedDate[date] = {
      selected: true,
    };
    setMarkedDates(markedDate);
    setDate(date);
  };

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    const selectedTime = selectedDate.toISOString().slice(11, 19);
    setTime(selectedTime);
  };

  useEffect(() => {
    setNewDaySelected(new Date().toISOString().slice(0, 10));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Fontisto name="date" style={styles.icon} />
        <Text style={styles.txt}>{name} Date</Text>
        <Switch
          value={daySwitch}
          onValueChange={() =>
            dispatch.switchDispatch({ type: "switch_day", payload: name })
          }
        />
      </View>
      {daySwitch && !timeSwitch && (
        <Calendar
          markedDates={markedDates}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            setNewDaySelected(day.dateString);
          }}
        />
      )}
      {timeSwitch && <Text>{date}</Text>}
      <View style={styles.switchContainer}>
        <Ionicons name="time-outline" style={styles.icon} />
        <Text style={styles.txt}>{name} Time</Text>
        <Switch
          value={timeSwitch}
          onValueChange={() => {
            dispatch.switchDispatch({ type: "switch_time", payload: name });
            // Use timeSwitch b/c the state value is changed but don't update yet
            if (!timeSwitch) {
              setShow(true);
            }
          }}
        />
      </View>
      {show && (
        <DateTimePicker
          style={{ alignSelf: "flex-end", width: 100 }}
          mode="time"
          value={new Date()}
          onChange={onChange}
          display={Platform.OS === "ios" ? "inline" : "default"}
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
