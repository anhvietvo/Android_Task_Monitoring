import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SignupScreen = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KeyboardAvoidingView behavior={"position"} style={styles.keyboardAvoid}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={[styles.text, styles.header]}>Let's Get Started!</Text>
          <Text style={[styles.text, styles.subHeader]}>
            Create an account to get all features
          </Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="pencil-box-outline"
              style={styles.icon}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Full name"
              autoCapitalize="words"
              autoCorrect={false}
              value={fullname}
              onChangeText={setFullname}
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="user" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="key-outline" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="key-outline" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Confirm password"
              autoCapitalize="none"
              secureTextEntry={true}
              autoCorrect={false}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => {}}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>
              CREATE
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Force navigator don't shown header
SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 70,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "100",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#2E3191",
    marginBottom: 15,
    backgroundColor: "white",
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    paddingRight: 5,
    //paddingHorizontal: 20,
    //backgroundColor: 'red'
  },
  icon: {
    //backgroundColor: 'gray',
    marginHorizontal: 10,
    fontSize: 40,
    color: "#2E3191",
  },
  btn: {
    height: 40,
    marginTop: 15,
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor: "#edf6ff",
    borderColor: "#2E3191",
  },
  text: {
    color: "#171b84",
    alignSelf: "center",
  },
  keyboardAvoid: {
    paddingBottom: 50,
    //flex: 1,
    //borderWidth: 10,
    //borderColor: 'red',
    justifyContent: "center",
  },
});

export default SignupScreen;
