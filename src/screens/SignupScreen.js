import React from "react";
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
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="user" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
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
            />
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>
              CREATE
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    paddingHorizontal: 20,
    marginTop: 15,
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
    paddingBottom: 105,
  },
});

export default SignupScreen;
