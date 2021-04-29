import React, { useContext } from "react";
import _ from "lodash";

import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import { Context as TaskContext } from "../context/TaskContext";

const CalendarBar = ({ marked, children }) => {
  const { addEmpty } = useContext(TaskContext);
  const today = new Date().toISOString().split("T")[0];

  getMarkedDates = (markedArr) => {
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
