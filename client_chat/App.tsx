import React, {useEffect, useRef, useState}from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATIONS_ROUTE } from './src/navigation/Routes';
import SplashScreen from "./src/pages/login/SplashScreen";
import LoginScreen from "./src/pages/login/LoginScreen";
import RegisterScreen from "./src/pages/login/Register";
import HomeScreen from "./src/pages/home/HomeScreen";
import ContactScreen from "./src/pages/contacts/ContactScreen";
import BottomNavigation from "./src/navigation/bottomNavigation/BottomNavigation";
import MessageScreen from "./src/pages/message/Message";
import ProfileScreen from "./src/pages/profile/ProfileScreen";
import { store } from "./src/redux/Store";
import { Provider } from "react-redux";
import FriendRequestScreen from "./src/pages/friendRequest/FriendRequestScreen";
import { NotificationListener, getFCMToken } from "./src/notification/PushNotification";
import { AppState } from "react-native";
import axios from "axios";
import axiosClient from "./src/api/axiosClient";
import getToken from "./src/data/AsyncStorage";
const Stack = createNativeStackNavigator();

export default function App() {
  const appState = useRef(AppState.currentState)

  useEffect (() => {
    getFCMToken(),
    NotificationListener()
  },[])
  useEffect(() => {
    const subAppState =  AppState.addEventListener('change',  async nextAppState =>  {
      appState.current = nextAppState
      const token = await getToken()
      let status: string = 'online'
      if (appState.current === 'background'){
          status = 'offline'
      }

       await axiosClient.put('/user/status', { status},  {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
    });  
    return () => {
      subAppState.remove();
    };
  }, []);



 
  return (
    <Provider store= { store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATIONS_ROUTE.SCREEN_SPLASH} screenOptions={{headerShown:false}}>
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_LOGIN} component={LoginScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_SPLASH} component={SplashScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_REGISTER} component={RegisterScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION} component={BottomNavigation} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_MESSAGE} component={MessageScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_PROFILE} component={ProfileScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_FRIEND_REQUEST} component={FriendRequestScreen} />

      </Stack.Navigator>
      
    </NavigationContainer>
    </Provider>
  )
}