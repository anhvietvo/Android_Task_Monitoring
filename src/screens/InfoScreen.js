import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { SocialIcon, AirbnbRating, Card } from "react-native-elements";

import { Context as AuthContext } from "../context/AuthContext";

const InfoScreen = () => {
  const { state, signout, updatePassword, clearUpdateMsg } = useContext(
    AuthContext
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <NavigationEvents onWillFocus={clearUpdateMsg} />
      <ScrollView>
        <Text style={styles.helloTxt}>Hello, {state.fullname}</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Card>
            <FontAwesome
              name="user-circle"
              size={100}
              color="black"
              style={styles.avatar}
            />
            <Card.Divider />
            <View style={styles.txtContainer}>
              <Text style={styles.txt}>Full name</Text>
              <Text style={[styles.txt, styles.txtDetails]}>
                {state.fullname}
              </Text>
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.txt}>Username</Text>
              <Text style={[styles.txt, styles.txtDetails]}>
                {state.username}
              </Text>
            </View>
            <View style={styles.txtContainer}>
              <Text style={[styles.txt, { paddingRight: 28 }]}>
                New password
              </Text>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={[styles.txt, styles.txtInput]}
              />
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.txt}>Confirm password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={[styles.txt, styles.txtInput]}
              />
            </View>
            {state.updateMsg ? (
              <Text style={{ color: "green" }}>{state.updateMsg}</Text>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                if (
                  !(
                    newPassword.replace(/\s/g, "") &&
                    confirmPassword.replace(/\s/g, "")
                  )
                ) {
                  Alert.alert("You must confirm all terms are fulfilled");
                } else if (newPassword !== confirmPassword) {
                  Alert.alert("Your password did not match. Try again");
                } else {
                  updatePassword(state.UID, newPassword);
                  setNewPassword("");
                  setConfirmPassword("");
                }
              }}
            >
              <Text style={[styles.btnTxt, { paddingTop: 10, fontSize: 16 }]}>
                Update Password
              </Text>
            </TouchableOpacity>
          </Card>
        </TouchableWithoutFeedback>
        <AirbnbRating />
        <TouchableOpacity style={styles.btn} onPress={signout}>
          <Text style={styles.btnTxt}>Log out</Text>
        </TouchableOpacity>
        <Text style={styles.contactText}>Contact us</Text>
        <View style={styles.iconContainer}>
          <SocialIcon type="facebook" light />
          <SocialIcon type="github-alt" light />
          <SocialIcon type="instagram" light />
          <SocialIcon type="youtube" light />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

InfoScreen.navigationOptions = {
  title: "Settings",
  tabBarIcon: <Ionicons name="settings-sharp" size={20} />,
};

const styles = StyleSheet.create({
  helloTxt: {
    marginTop: 30,
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 10,
  },
  txtContainer: {
    flexDirection: "row",
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  txt: {
    fontSize: 18,
  },
  txtDetails: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  txtInput: {
    flex: 1,
    paddingLeft: 10,
  },
  btn: {
    //width: 120,
    height: 40,
    marginVertical: 15,
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor: "#edf6ff",
    borderColor: "#2E3191",
  },
  btnTxt: {
    fontWeight: "bold",
    color: "#171b84",
    fontSize: 20,
    alignSelf: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  contactText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InfoScreen;
