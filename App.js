import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./android/app/src/components/LoginPage";
import Form from "./android/app/src/components/Forms";
import Signup from "./android/app/src/components/Signup";
import SendOTP from "./android/app/src/components/SendOTP";
// import gps from './android/app/src/components/gps';
import { State } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const myStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SendOTP" component={SendOTP} />
        <Stack.Screen name="Form" component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default myStack;