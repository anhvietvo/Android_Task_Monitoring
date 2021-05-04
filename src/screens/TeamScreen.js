import React from "react";
import { Text, View, StyleSheet } from "react-native";

import CalendarBar from "../components/CalendarBar";
import { SafeAreaView } from "react-navigation";

const TeamScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
      <CalendarBar marked={[]} />
    </SafeAreaView>
  );
};

export default TeamScreen;
