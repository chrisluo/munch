import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList
} from "@react-navigation/drawer";
import AuthScreen, {
  screenOptions as authScreenOptions
} from "../screens/AuthScreen";
import HomeScreen, {
  screenOptions as homeScreenOptions
} from "../screens/HomeScreen";
import { Platform, View, Button, SafeAreaView, Text } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";
import RootState from "../store";

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

const MainStackNavigator = createStackNavigator();
export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MainStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
    </MainStackNavigator.Navigator>
  );
};

const MainDrawerNavigator = createDrawerNavigator();
export const DrawerNavigator = () => {
  const dispatch = useDispatch();
  const userId = useSelector<RootState>(state => state.auth.userId);
  return (
    <MainDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary.main
      }}
      drawerContent={props => {
        return (
          <View
            style={{
              flex: 1,
              paddingTop: 30
            }}
          >
            <SafeAreaView>
              <View>
                <Text>{userId}</Text>
              </View>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary.main}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <MainDrawerNavigator.Screen
        name="Home"
        component={MainNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </MainDrawerNavigator.Navigator>
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
