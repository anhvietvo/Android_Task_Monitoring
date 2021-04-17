import React from "react";

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from "./src/screens/LoginScreen";
import InfoScreen from "./src/screens/InfoScreen";
import PersonalScreen from "./src/screens/PersonalScreen";
import TeamScreen from "./src/screens/TeamScreen";
import SignupScreen from "./src/screens/SignupScreen";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Login: LoginScreen,
  }),
  mainFlow: createBottomTabNavigator({
    Personal: PersonalScreen,
    Team: TeamScreen,
    Info: InfoScreen,
  }),
});

export default createAppContainer(switchNavigator);
