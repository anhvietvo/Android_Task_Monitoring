import React from "react";
import { Text, View, StyleSheet } from "react-native";

import CalendarBar from "../components/CalendarBar";
import { SafeAreaView } from "react-navigation";

const TeamScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarBar />
    </SafeAreaView>
  );
};

export default TeamScreen;
