import React, { useState, useContext, useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { Button, CheckBox, Divider, Input } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import AddTaskForm from "../../components/AddTaskForm";

import { Context as TeamTaskContext } from "../../context/TeamTaskContext";

const AddTeamTask = ({ navigation }) => {
  const team = navigation.state.params.item;

  const { state, addTask, addUser, clearMsg, loadUser, setCheck } = useContext(
    TeamTaskContext
  );

  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadUser(team.TID);
  }, []);

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
        <Text style={{ fontSize: 20, paddingLeft: 15 }}>Allocated To:</Text>
        {state.employees.map((user) => {
          return (
            <CheckBox
              key={user.username}
              title={user.username}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={user.check}
              onPress={() => setCheck(user.username)}
            />
          );
        })}
      </AddTaskForm>
    </ScrollView>
  );
};

export default AddTeamTask;
