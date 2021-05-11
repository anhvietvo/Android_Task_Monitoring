import React from "react";
import TaskList from "../../components/TaskList";
import { FAB } from "react-native-elements";

import CalendarBar from "../../components/CalendarBar";
import { SafeAreaView } from "react-navigation";

const TeamScreen = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
      <CalendarBar marked={[]}>
        <TaskList sortedState={[]} />
      </CalendarBar>
      <FAB
        title="Teams"
        placement="right"
        onPress={() => navigation.navigate("ManageTeams")}
      />
    </SafeAreaView>
  );
};

TeamScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default TeamScreen;
