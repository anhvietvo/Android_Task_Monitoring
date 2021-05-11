import React, { useState, useContext } from "react";
import { Text, ScrollView } from "react-native";
import { Button, SearchBar, Divider, Input } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import AddTaskForm from "../../components/AddTaskForm";

import { Context as TeamTaskContext } from "../../context/TeamTaskContext";

const AddTeamTask = ({ navigation }) => {
  const team = navigation.state.params.item;

  // State to handle searchBar
  const { state, addTask, addUser, clearMsg } = useContext(TeamTaskContext);

  const [searchName, setSearchName] = useState("");
  const [searchEmployee, setSearchEmployee] = useState("");

  return (
    <ScrollView>
      <NavigationEvents onWillFocus={clearMsg} />
      <Text style={{ fontSize: 35, marginVertical: 10 }}>
        Add New User To Team
      </Text>
      <Input
        placeholder="Add username"
        value={searchName}
        onChangeText={setSearchName}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {state.msg ? <Text style={{ marginBottom: 10 }}>{state.msg}</Text> : null}
      <Button
        disabled={searchName.replace(/\s/g, "").length ? false : true}
        title="Add User"
        onPress={() => {
          addUser(searchName, team.TID);
        }}
      />
      <Divider style={{ height: 3, marginVertical: 15 }} />
      <AddTaskForm addTask={addTask}>
        <SearchBar
          lightTheme
          round
          placeholder="Allocate task to"
          value={searchEmployee}
          onChangeText={setSearchEmployee}
        />
      </AddTaskForm>
    </ScrollView>
  );
};

export default AddTeamTask;
