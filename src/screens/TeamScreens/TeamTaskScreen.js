import React, { useContext } from "react";
import TaskList from "../../components/TaskList";
import { FAB } from "react-native-elements";

import CalendarBar from "../../components/CalendarBar";
import { SafeAreaView } from "react-navigation";
import { NavigationEvents } from "react-navigation";

import { Context as TeamTaskContext } from "../../context/TeamTaskContext";
import _ from "lodash";

const TeamTaskScreen = ({ navigation }) => {
  const { state, addEmpty, clearEmpty } = useContext(TeamTaskContext);
  const TID = navigation.state.params;

  const sortedState = state.task
    .filter((task) => task.data[0].TID === TID || _.isEmpty(task.data[0]))
    .sort((a, b) => {
      const aDate = new Date(a.title);
      const bDate = new Date(b.title);
      return aDate - bDate;
    });

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={clearEmpty} />
      <CalendarBar marked={sortedState} addEmpty={addEmpty}>
        <TaskList sortedState={sortedState} />
      </CalendarBar>
      <FAB
        title="Add"
        placement="right"
        onPress={() => navigation.navigate("Add", TID)}
      />
    </SafeAreaView>
  );
};

TeamTaskScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default TeamTaskScreen;
