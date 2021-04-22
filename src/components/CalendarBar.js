import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";

const CalendarBar = ({ children }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <CalendarProvider date={today} showTodayButton>
      <ExpandableCalendar firstDay={1} />
      {children}
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({});

export default CalendarBar;
