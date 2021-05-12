import React, { useContext, useEffect } from "react";

import CalendarBar from "../../components/CalendarBar";
import { SafeAreaView } from "react-navigation";
import _ from "lodash";
import { FAB } from "react-native-elements";
import TaskList from "../../components/TaskList";

import { Context as TaskContext } from "../../context/TaskContext";
import { Context as AuthContext } from "../../context/AuthContext";

const PersonalScreen = ({ navigation }) => {
  const { state, updateStatus, loadTask, deleteTask } = useContext(TaskContext);
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
    <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
      <CalendarBar marked={sortedState}>
        <TaskList
          refresh={()=>loadTask(authContext.state.username)}
          sortedState={sortedState}
          updateStatus={updateStatus}
          deleteTask={deleteTask}
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

export default PersonalScreen;
