import React, { useContext } from "react";
import _ from "lodash";

import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import { Context as TaskContext } from "../context/TaskContext";

const CalendarBar = ({ marked, children }) => {
  const { addEmpty } = useContext(TaskContext);
  const offset = new Date().getTimezoneOffset() * 60000; // Get offset between local timezone and UTC in miliseconds
  const today = new Date(Date.now() - offset).toISOString().split("T")[0];

  const getMarkedDates = (markedArr) => {
    const marked = {};
    markedArr.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = { marked: true };
      }
    });
    return marked;
  };

  return (
    <CalendarProvider
      date={today}
      showTodayButton
      onDateChanged={(date) => {
        if (!marked.includes(date)) {
          addEmpty(date);
        }
      }}
    >
      <ExpandableCalendar firstDay={1} markedDates={getMarkedDates(marked)} />
      {children}
    </CalendarProvider>
  );
};

export default CalendarBar;
