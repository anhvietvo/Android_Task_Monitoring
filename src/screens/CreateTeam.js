import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from 'react-native-elements';

import { Context as TeamContext } from "../context/TeamContext";

const CreateTeam = () => {
  const { addTeam } = useContext(TeamContext);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  return (
    <View>
      <Text style={{ fontSize: 40 }}>Create Team Form</Text>
      <Input placeholder="Team name" value={name} onChangeText={setName} />
      <Input placeholder="Details" value={details} onChangeText={setDetails} />
      <Button title="Create" onPress={() => addTeam(name, details)}/>
    </View>
  ) 
}

const styles = StyleSheet.create({});

export default CreateTeam;
