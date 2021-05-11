import React from "react";
import TaskList from "../../components/TaskList";
import { FAB } from "react-native-elements";

import CalendarBar from "../../components/CalendarBar";
import { SafeAreaView } from "react-navigation";

const TeamTaskScreen = ({ navigation }) => {
  const team = navigation.state.params;
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
      <CalendarBar marked={[]}>
        <TaskList sortedState={[]} />
      </CalendarBar>
      <FAB
        title="Add"
        placement="right"
        onPress={() => navigation.navigate("Add", { team })}
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
