import React from "react";
import { ScrollView } from "react-native";

import AddTaskForm from "../../components/AddTaskForm";

import { Context as PersonalTaskContext } from "../../context/TaskContext";

const AddPersonalTask = () => {
  return (
    <ScrollView>
      <AddTaskForm contextForTask={PersonalTaskContext} />
    </ScrollView>
  )
};

export default AddPersonalTask;
