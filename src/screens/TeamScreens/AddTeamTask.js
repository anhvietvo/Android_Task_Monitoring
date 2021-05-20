import React, { useState, useContext, useEffect } from "react";
import { Text, ScrollView, Alert } from "react-native";
import { Button, CheckBox, Divider, Input } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import AddTaskForm from "../../components/AddTaskForm";

import { Context as TeamTaskContext } from "../../context/TeamTaskContext";
import { Context as AuthContext } from "../../context/AuthContext";

const AddTeamTask = ({ navigation }) => {
  const team = navigation.state.params;
  const TID = team.TID;
  const manager = team.manager;

  const { state, addTask, addUser, clearMsg, loadUser, setCheck } = useContext(
    TeamTaskContext
  );

  const username = useContext(AuthContext).state.username;
  const UID = useContext(AuthContext).state.UID;

  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadUser(TID);
  }, []);

  // Get the array of user who is checked
  const checkStatus = state.employees.filter((user) => user.check);

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
          if (UID === manager) {
            addUser(searchName, TID);
            loadUser(TID);
          } else {
            Alert.alert("Only the team manager can add new members");
          }
        }}
      />
      <Divider style={{ height: 3, marginVertical: 15 }} />
      <AddTaskForm
        addTask={addTask}
        owner={{ TID, username, manager, UID }}
        checkStatus={checkStatus}
      >
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
