import React, { useContext } from "react";
import TaskList from "../../components/TaskList";
import { FAB } from "react-native-elements";

import CalendarBar from "../../components/CalendarBar";
import { SafeAreaView } from "react-navigation";

import { Context as TeamTaskContext } from "../../context/TeamTaskContext";

const TeamTaskScreen = ({ navigation }) => {
  const { state } = useContext(TeamTaskContext);

  const sortedState = state.task.sort((a, b) => {
    const aDate = new Date(a.title);
    const bDate = new Date(b.title);
    return aDate - bDate;
  });

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
      <CalendarBar marked={sortedState}>
        <TaskList sortedState={sortedState} />
      </CalendarBar>
      <FAB
        title="Add"
        placement="right"
        onPress={() => navigation.navigate("Add", navigation.state.params)}
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
