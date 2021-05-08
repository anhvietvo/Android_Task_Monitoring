import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoginScreen from "./src/screens/LoginScreen";
import InfoScreen from "./src/screens/InfoScreen";
import PersonalScreen from "./src/screens/PersonalScreen";
import TeamScreen from "./src/screens/TeamScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import AddTaskForm from "./src/screens/AddTaskForm";
import ManageTeams from "./src/screens/ManageTeams";
import CreateTeam from "./src/screens/CreateTeam";
import TeamTask from "./src/screens/TeamTask";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as TaskProvider } from "./src/context/TaskContext";
import { Provider as TeamProvider } from "./src/context/TeamContext";
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
      Add: AddTaskForm,
    }),
    Team: createStackNavigator({
      Team: TeamScreen,
      ManageTeams: ManageTeams,
      CreateTeam: CreateTeam,
      TeamTask: TeamTask,
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
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </TeamProvider>
      </TaskProvider>
    </AuthProvider>
  );
};
