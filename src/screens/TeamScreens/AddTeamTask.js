import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import { Button, SearchBar, Divider } from "react-native-elements";

import AddTaskForm from "../../components/AddTaskForm";

import { Context as TeamTaskContext } from "../../context/TeamTaskContext";

const AddPersonalTask = ({ navigation }) => {
  // State to handle searchBar
  const [searchName, setSearchName] = useState("");

  return (
    <ScrollView>
      <Text style={{ fontSize: 35, marginVertical: 10 }}>
        Add New User To Team
      </Text>
      <SearchBar
        lightTheme
        round
        placeholder="Search username"
        value={searchName}
        onChangeText={setSearchName}
      />
      <Button style={{ marginVertical: 15 }} title="Add User" />
      <Divider style={{ height: 3 }} />
      <AddTaskForm contextForTask={TeamTaskContext} />
    </ScrollView>
  );
};

export default AddPersonalTask;
