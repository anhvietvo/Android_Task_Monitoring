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
  const {
    state,
    addEmpty,
    clearEmpty,
    loadTask,
    updateStatus,
    deleteTask,
  } = useContext(TeamTaskContext);
  const team = navigation.state.params;
  const TID = team.TID;
  const manager = team.manager;
  const UID = useContext(AuthContext).state.UID;

  useEffect(() => {
    loadTask(UID, TID, manager);
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
          refresh={() => loadTask(UID, TID, manager)}
          sortedState={sortedState}
          updateStatus={updateStatus}
          deleteTask={deleteTask}
          canDelete={manager === UID}
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
