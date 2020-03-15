import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator, DrawerNavigator } from "./MunchNavigator";
import RootState from "../store";
import StartupScreen from "../screens/StartupScreen";

const AppNavigator = props => {
  const isAuth = useSelector<RootState>(state => !!state.auth.token);
  const didTryAutoLogin = useSelector<RootState>(
    state => state.auth.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuth && <DrawerNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
