import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { OverviewNavigator, AuthNavigator } from "./MunchNavigator";
import RootState from "../store";

const AppNavigator = props => {
  const isAuth = useSelector<RootState>(state => !!state.auth.token);

  return (
    <NavigationContainer>
      {isAuth && <OverviewNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
