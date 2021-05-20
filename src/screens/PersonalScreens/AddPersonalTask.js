import React, { useContext } from "react";
import { ScrollView } from "react-native";

import AddTaskForm from "../../components/AddTaskForm";

import { Context as PersonalTaskContext } from "../../context/TaskContext";
import { Context as AuthContext } from "../../context/AuthContext";

const AddPersonalTask = () => {
  const { addTask } = useContext(PersonalTaskContext);
  const { state } = useContext(AuthContext);

  return (
    <ScrollView>
      <AddTaskForm addTask={addTask} owner={state.UID} />
    </ScrollView>
  );
};

export default AddPersonalTask;
