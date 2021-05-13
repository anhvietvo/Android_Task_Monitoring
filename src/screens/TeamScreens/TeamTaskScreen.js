import React, { useContext, useEffect } from "react";
import TaskList from "../../components/TaskList";
import { FAB } from "react-native-elements";

import CalendarBar from "../../components/CalendarBar";
import { SafeAreaView } from "react-navigation";
import { NavigationEvents } from "react-navigation";

import { Context as TeamTaskContext } from "../../context/TeamTaskContext";
import { Context as AuthContext } from "../../context/AuthContext";
import _ from "lodash";

const TeamTaskScreen = ({ navigation }) => {
  const { state, addEmpty, clearEmpty, loadTask } = useContext(TeamTaskContext);
  const team = navigation.state.params;
  const TID = team.TID;
  const manager = team.manager;
  const username = useContext(AuthContext).state.username;

  useEffect(() => {
    loadTask(username, TID, manager);
  }, []);

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
        <TaskList
          refresh={() => loadTask(username, TID, manager)}
          sortedState={sortedState}
        />
      </CalendarBar>
      <FAB
        title="Add"
        placement="right"
        onPress={() => navigation.navigate("Add", team)}
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
