import React, { useState, useCallback } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import _ from "lodash";
import { AgendaList } from "react-native-calendars";

const buttonPressed = (item, updateStatus) => {
  var ID;
  "PTID" in item ? (ID = item.PTID) : (ID = item.TTID);
  Alert.alert("Are you done?", "", [
    {
      text: "Not yet",
      onPress: () => updateStatus(ID, 0),
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        updateStatus(ID, 1);
      },
    },
  ]);
};

const itemPressed = (item, deleteTask, canDelete) => {
  var ID;
  "PTID" in item ? (ID = item.PTID) : (ID = item.TTID);
  Alert.alert(
    item.title,
    `Details: ${item.details}\nStart Date: ${item.startDate}\nStart Time: ${item.startTime}\nFinish Date: ${item.finishDate}\nFinish Time: ${item.finishTime}`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          if (canDelete) deleteTask(ID);
          else
            Alert.alert(
              "You cannot delete this task. This action need a manager."
            );
        },
        style: "destructive",
      },
    ]
  );
};

const renderItem = ({ item }, updateStatus, deleteTask, canDelete) => {
  if (_.isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  const finishDate = new Date(item.finishDate);
  const now = new Date();
  const diffTime = finishDate.getTime() - now.getTime();
  var diffDays;
  if (diffTime >= 0) {
    diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
  } else {
    diffDays = -1;
  }

  return (
    <TouchableOpacity
      onPress={() => itemPressed(item, deleteTask, canDelete)}
      style={styles.item}
    >
      <View style={{ width: 75 }}>
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
      <View style={styles.titleContainer}>
        <Text
          style={[styles.itemTitleText, item.status ? styles.textDone : null]}
        >
          {item.title}
        </Text>
        {"allocateList" in item ? (
          <Text style={styles.allocateText}>{item.allocateList}</Text>
        ) : null}
      </View>
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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const TaskList = ({
  sortedState,
  updateStatus,
  deleteTask,
  refresh,
  canDelete = true,
}) => {
  // Control pull down flat list to refresh
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      refresh();
      setRefreshing(false);
    });
  }, []);

  return sortedState.length ? (
    <AgendaList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      sections={sortedState}
      extraData={sortedState}
      renderItem={(item) =>
        renderItem(item, updateStatus, deleteTask, canDelete)
      }
    />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text
        style={[
          styles.emptyItemText,
          { flex: 1, fontSize: 30, marginTop: 20, alignSelf: "center" },
        ]}
      >
        No Events Planned
      </Text>
    </ScrollView>
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
    marginBottom: 6,
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    alignSelf: "center",
    //marginLeft: 4,
  },
  titleContainer: {
    marginHorizontal: 16,
    flex: 1,
  },
  itemTitleText: {
    color: "black",
    //marginHorizontal: 16,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    //flex: 1,
    //alignSelf: "center",
  },
  allocateText: {
    color: "gray",
    fontSize: 12,
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
