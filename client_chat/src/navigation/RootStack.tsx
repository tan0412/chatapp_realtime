import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATIONS_ROUTE } from "./Routes";
import LoginScreen from "../pages/login/LoginScreen";
import SplashScreen from "../pages/login/SplashScreen";
import RegisterScreen from "../pages/login/Register";


const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    
      <Stack.Navigator initialRouteName={NAVIGATIONS_ROUTE.SCREEN_SPLASH} screenOptions={{headerShown:false}}>
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_LOGIN} component={LoginScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_SPLASH} component={SplashScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_REGISTER} component={RegisterScreen} />
      </Stack.Navigator>
      
    
  )
}