import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen, {
  screenOptions as authScreenOptions
} from "../screens/AuthScreen";
import OverviewScreen from "../screens/OverviewScreen";
import { Platform } from "react-native";
import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary.main : ""
  },
  headerTitleStyle: {
    fontFamily: "lato-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "lato"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary.main
};

const OverviewStackNavigator = createStackNavigator();
export const OverviewNavigator = () => {
  return (
    <OverviewStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OverviewStackNavigator.Screen
        name="Overview"
        component={OverviewScreen}
      />
    </OverviewStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
