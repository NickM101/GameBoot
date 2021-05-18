import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GameScreen from "../screen/GameScreen";
import BottomNavigator from "./BottomNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="App" component={BottomNavigator} />
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
