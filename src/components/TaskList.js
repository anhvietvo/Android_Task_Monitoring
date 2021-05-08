import React from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import _ from "lodash";
import { AgendaList } from "react-native-calendars";

const buttonPressed = (item, updateStatus) => {
  Alert.alert("Are you done?", "", [
    {
      text: "Not yet",
      onPress: () => updateStatus(item.PTID, 0),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        updateStatus(item.PTID, 1);
      },
    },
  ]);
};

const itemPressed = (item, deleteTask) => {
  Alert.alert(
    item.title,
    item.details
      ? `Details: ${item.details}\n`
      : "" +
          `Start Date: ${item.startDate}\nStart Time: ${item.startTime}\nFinish Date: ${item.finishDate}\nFinish Time: ${item.finishTime}`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteTask(item.PTID),
        style: "destructive",
      },
    ]
  );
};

const renderItem = ({ item }, updateStatus, deleteTask) => {
  if (_.isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  const now = new Date();
  const finishDate = new Date(item.finishDate);
  var diffDays;
  const diff = (finish, now) => {
    return finish - now;
  };
  if ((diffTime = diff(finishDate, now) >= 0)) {
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else {
    diffDays = -1;
  }

  return (
    <TouchableOpacity
      onPress={() => itemPressed(item, deleteTask)}
      style={styles.item}
    >
      <View style={{ width: 65 }}>
        <Text
          style={[styles.itemHourText, item.status ? styles.textDone : null]}
        >
          {item.finishTime}
        </Text>
        {diffDays === -1 ? (
          <Text style={[styles.itemDurationText, { color: "red" }]}>
            Time out
          </Text>
        ) : (
          <Text style={styles.itemDurationText}>Due: {diffDays} days</Text>
        )}
      </View>
      <Text
        style={[styles.itemTitleText, item.status ? styles.textDone : null]}
      >
        {item.title}
      </Text>
      <TouchableOpacity
        style={styles.itemButtonContainer}
        onPress={() => buttonPressed(item, updateStatus)}
      >
        <Text
          style={{
            fontSize: 16,
            alignSelf: "center",
            color: "gray",
            fontWeight: "200",
          }}
        >
          {item.status ? "Done" : "Working..."}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const TaskList = ({ sortedState, updateStatus, deleteTask }) => {
  return sortedState.length ? (
    <AgendaList
      sections={sortedState}
      extraData={sortedState}
      renderItem={(item) => renderItem(item, updateStatus, deleteTask)}
    />
  ) : (
    <Text
      style={[
        styles.emptyItemText,
        { flex: 1, fontSize: 30, marginTop: 20, alignSelf: "center" },
      ]}
    >
      No Events Planned
    </Text>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
    alignSelf: "center",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    alignSelf: "center",
    //marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginHorizontal: 16,
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    //alignSelf: "center",
  },
  itemButtonContainer: {
    //backgroundColor: "red",
    //flex: 1,
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
  textDone: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});

export default TaskList;
