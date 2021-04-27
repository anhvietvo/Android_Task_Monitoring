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
import { FAB } from 'react-native-elements';

import { Context as TaskContext } from "../context/TaskContext";

// Data to test
const today = new Date().toISOString().split("T")[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split("T")[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split("T")[0];
}

const ITEMS = [
  {
    title: dates[0],
    data: [{ hour: "12am", duration: "1h", title: "First Yoga" }],
  },
  {
    title: dates[1],
    data: [
      { hour: "4pm", duration: "1h", title: "Pilates ABC" },
      { hour: "5pm", duration: "1h", title: "Vinyasa Yoga" },
    ],
  },
  {
    title: dates[2],
    data: [
      { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
      { hour: "2pm", duration: "1h", title: "Deep Streches" },
      { hour: "3pm", duration: "1h", title: "Private Yoga" },
    ],
  },
  {
    title: dates[3],
    data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
  },
  { title: dates[4], data: [{}] },
  {
    title: dates[5],
    data: [
      { hour: "9pm", duration: "1h", title: "Middle Yoga" },
      { hour: "10pm", duration: "1h", title: "Ashtanga" },
      { hour: "11pm", duration: "1h", title: "TRX" },
      { hour: "12pm", duration: "1h", title: "Running Group" },
    ],
  },
  {
    title: dates[6],
    data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
  },
  { title: dates[7], data: [{}] },
  {
    title: dates[8],
    data: [
      { hour: "9pm", duration: "1h", title: "Pilates Reformer" },
      { hour: "10pm", duration: "1h", title: "Ashtanga" },
      { hour: "11pm", duration: "1h", title: "TRX" },
      { hour: "12pm", duration: "1h", title: "Running Group" },
    ],
  },
  {
    title: dates[9],
    data: [
      { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
      { hour: "2pm", duration: "1h", title: "Deep Streches" },
      { hour: "3pm", duration: "1h", title: "Private Yoga" },
    ],
  },
  {
    title: dates[10],
    data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
  },
];
function buttonPressed() {
  Alert.alert("show more");
}

function itemPressed(id) {
  Alert.alert(id);
}

function renderEmptyItem() {
  return (
    <View style={styles.emptyItem}>
      <Text style={styles.emptyItemText}>No Events Planned</Text>
    </View>
  );
}

renderItem = ({ item }) => {
  if (_.isEmpty(item)) {
    return renderEmptyItem();
  }

  return (
    <TouchableOpacity
      onPress={() => itemPressed(item.title)}
      style={styles.item}
      //testID={testIDs.agenda.ITEM}
    >
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
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

  console.log(state);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarBar>
        <AgendaList
          sections={ITEMS}
          //extraData={this.state}
          renderItem={renderItem}
        />
      </CalendarBar>
      <FAB title="Add" placement="right" onPress={() => navigation.navigate("Add")} />
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
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
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
