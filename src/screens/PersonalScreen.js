import React, { useContext, useEffect } from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import CalendarBar from "../components/CalendarBar";
import { SafeAreaView } from "react-navigation";
import { AgendaList } from "react-native-calendars";
import _ from "lodash";
import { FAB } from "react-native-elements";

import { Context as TaskContext } from "../context/TaskContext";
import { Context as AuthContext } from "../context/AuthContext";

function buttonPressed(item, updateStatus) {
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
}

function itemPressed(item) {
  Alert.alert(
    item.title,
    item.details
      ? `Details: ${item.details}\n`
      : "" +
          `Start Date: ${item.startDate}\nStart Time: ${item.startTime}\nFinish Date: ${item.finishDate}\nFinish Time: ${item.finishTime}`
  );
}

const renderItem = ({ item }, updateStatus) => {
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
    <TouchableOpacity onPress={() => itemPressed(item)} style={styles.item}>
      <View>
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
          <Text style={styles.itemDurationText}>Due in {diffDays} days</Text>
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

const PersonalScreen = ({ navigation }) => {
  const { state, updateStatus, loadTask } = useContext(TaskContext);
  const authContext = useContext(AuthContext);

  // Sort the state to render in ascending order
  const sortedState = state.sort((a, b) => {
    const aDate = new Date(a.title);
    const bDate = new Date(b.title);
    return aDate - bDate;
  });

  useEffect(() => {
    loadTask(authContext.state.username);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarBar marked={sortedState}>
        {sortedState.length ? (
          <AgendaList
            sections={sortedState}
            extraData={state}
            renderItem={(item) => renderItem(item, updateStatus)}
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
        )}
      </CalendarBar>
      <FAB
        title="Add"
        placement="right"
        onPress={() => navigation.navigate("Add")}
      />
    </SafeAreaView>
  );
};

PersonalScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
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

export default PersonalScreen;
