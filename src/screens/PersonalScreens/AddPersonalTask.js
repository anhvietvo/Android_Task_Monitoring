import React, { useContext } from "react";
import { ScrollView } from "react-native";

import AddTaskForm from "../../components/AddTaskForm";

import { Context as PersonalTaskContext } from "../../context/TaskContext";

const AddPersonalTask = () => {
  const { addTask } = useContext(PersonalTaskContext);

  return (
    <ScrollView>
      <AddTaskForm addTask={addTask} />
    </ScrollView>
  );
};

export default AddPersonalTask;
