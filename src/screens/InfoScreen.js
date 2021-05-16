import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";

import { Context as AuthContext } from "../context/AuthContext";

const InfoScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>Info Screen</Text>
      <TouchableOpacity style={styles.btn} onPress={signout}>
        <Text
          style={{
            fontWeight: "bold",
            color: "#171b84",
            fontSize: 20,
            alignSelf: "center",
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

InfoScreen.navigationOptions = {
  title: "Settings",
  tabBarIcon: <Ionicons name="settings-sharp" size={20} />,
};

const styles = StyleSheet.create({
  btn: {
    //width: 120,
    height: 40,
    marginTop: 15,
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor: "#edf6ff",
    borderColor: "#2E3191",
  },
});

export default InfoScreen;
