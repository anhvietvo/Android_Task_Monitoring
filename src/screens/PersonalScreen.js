import React, { useContext } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

import CalendarBar from "../components/CalendarBar";
import { SafeAreaView } from "react-navigation";
import { AgendaList } from "react-native-calendars";
import _ from "lodash";
import { FAB } from "react-native-elements";

import { Context as TaskContext } from "../context/TaskContext";

function buttonPressed() {
  Alert.alert("show more");
}

function itemPressed(id) {
  Alert.alert(id);
}

const renderItem = ({ item }) => {
  if (_.isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  const now = new Date();
  const finishDate = new Date(item.finishDate);
  const diffTime = Math.abs(finishDate - now);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <TouchableOpacity
      onPress={() => itemPressed(item.title)}
      style={styles.item}
    >
      <View>
        <Text style={styles.itemHourText}>{item.finishTime}</Text>
        <Text style={styles.itemDurationText}>Due in {diffDays} days</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
        <Button color={"grey"} title={"Info"} onPress={buttonPressed} />
      </View>
    </TouchableOpacity>
  );
};

const PersonalScreen = ({ navigation }) => {
  const { state } = useContext(TaskContext);

  // Sort the state to render in ascending order
  const sortedState = state.sort((a, b) => {
    const aDate = new Date(a.title);
    const bDate = new Date(b.title);
    return aDate - bDate;
  });

  //console.log(sortedState);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarBar marked={sortedState}>
        {sortedState.length ? (
          <AgendaList
            sections={sortedState}
            //extraData={state}
            renderItem={renderItem}
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
    padding: 20,
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
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 18,
    //alignSelf: "center",
    marginLeft: 10,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
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
});

export default PersonalScreen;
