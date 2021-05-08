import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import CalendarBar from "../components/CalendarBar";
import { SafeAreaView } from "react-navigation";

const TeamScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
      <Text style={{fontSize: 24, fontWeight: "bold"}}>Task Today</Text>
      <Text>You don't have any teams yet</Text>
      <Button
        icon={<AntDesign name="team" size={24} color="white" />}
        title="Your Team"
      />
    </SafeAreaView>
  );
};

export default TeamScreen;
