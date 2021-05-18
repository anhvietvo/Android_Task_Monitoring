import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from "react-native";

import { NavigationEvents } from "react-navigation";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //console.log(state);

  return (
    <KeyboardAvoidingView behavior={"position"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.background}>
          <NavigationEvents onWillFocus={clearErrorMessage} />
          <Image
            style={styles.img}
            source={require("../../../assets/logo.png")}
          />
          <View style={styles.inputContainer}>
            <Feather name="user" style={styles.icon} color="#2E3191" />
            <TextInput
              style={styles.input}
              placeholder="username"
              autoCapitalize={"none"}
              autoCorrect={false}
              value={username}
              onChangeText={(val) => setUsername(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="key-outline" style={styles.icon} color="#2E3191" />
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={password}
              onChangeText={(val) => setPassword(val)}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              username.replace(/\s/g, "").length &&
              password.replace(/\s/g, "").length
                ? signin({ username, password })
                : Alert.alert("You must confirm all terms are fulfilled");
            }}
          >
            <Text style={[styles.text, { fontSize: 20, alignSelf: "center" }]}>
              Log in
            </Text>
          </TouchableOpacity>
          {state.errorMessage ? (
            <Text style={{ fontSize: 16, color: "red" }}>
              {state.errorMessage}
            </Text>
          ) : null}
          <View style={styles.signupContainer}>
            <Text>Don't have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  //container: {
  ////flex: 1,
  //backgroundColor: 'gray',
  ////marginTop: 60,
  ////paddingBottom: 30,
  //},
  background: {
    //flex: 1,
    //paddingVertical: 20,
    marginHorizontal: 15,
    paddingTop: 70,
  },
  img: {
    alignSelf: "center",
    height: 300,
    width: 300,
    //resizeMode: "contain",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    //borderWidth: 1,
    //backgroundColor:'blue',
    //marginHorizontal: 15,
    marginBottom: 7,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "#2E3191",
  },
  input: {
    //borderWidth:2,
    //backgroundColor:'red',
    flex: 1,
    //borderRadius: 7,
    paddingHorizontal: 7,
    fontSize: 18,
    //backgroundColor:'white',
    //borderColor: '#2E3191'
  },
  icon: {
    fontSize: 40,
    marginHorizontal: 10,
    alignSelf: "center",
  },
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
  signupContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 15,
  },
  text: {
    fontWeight: "bold",
    color: "#171b84",
  },
});

export default LoginScreen;
