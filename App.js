import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoginScreen from "./src/screens/AuthenScreens/LoginScreen";
import InfoScreen from "./src/screens/InfoScreen";
import PersonalScreen from "./src/screens/PersonalScreens/PersonalScreen";
import SignupScreen from "./src/screens/AuthenScreens/SignupScreen";
import ResolveAuthScreen from "./src/screens/AuthenScreens/ResolveAuthScreen";
import AddPersonalTask from "./src/screens/PersonalScreens/AddPersonalTask";
import ManageTeams from "./src/screens/TeamScreens/ManageTeams";
import CreateTeam from "./src/screens/TeamScreens/CreateTeam";
import AddTeamTask from "./src/screens/TeamScreens/AddTeamTask";
import TeamTaskScreen from "./src/screens/TeamScreens/TeamTaskScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as TaskProvider } from "./src/context/TaskContext";
import { Provider as TeamProvider } from "./src/context/TeamContext";
import { Provider as TeamTaskProvider } from "./src/context/TeamTaskContext";
import { setNavigator } from "./src/navigationRef";

const switchNavigator = createSwitchNavigator({
  resolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: LoginScreen,
    Signup: SignupScreen,
  }),
  mainFlow: createBottomTabNavigator({
    Personal: createStackNavigator({
      Personal: PersonalScreen,
      Add: AddPersonalTask,
    }),
    Team: createStackNavigator({
      //Team: TeamScreen,
      ManageTeams: ManageTeams,
      CreateTeam: CreateTeam,
      TeamTask: TeamTaskScreen,
      Add: AddTeamTask,
    }),
    Info: InfoScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <TeamProvider>
          <TeamTaskProvider>
            <App
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </TeamTaskProvider>
        </TeamProvider>
      </TaskProvider>
    </AuthProvider>
  );
};
