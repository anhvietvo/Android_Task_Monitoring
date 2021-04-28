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
    >
      <View>
        <Text style={styles.itemHourText}>{item.startTime}</Text>
        <Text style={styles.itemDurationText}>{item.finishTime}</Text>
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
          sections={state}
          //extraData={this.state}
          renderItem={renderItem}
        />
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
