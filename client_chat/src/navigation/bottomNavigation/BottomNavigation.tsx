import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import ContactScreen from "../../pages/contacts/ContactScreen";
import HomeScreen from "../../pages/home/HomeScreen";
import TabBar from "./TabBar";



const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
   
    return (
        <Tab.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="chats"
            tabBar={props => <TabBar {...props} />}
    
            >

        
            <Tab.Screen name="Chats" component={HomeScreen} 
                options={{ 
                    tabBarBadge: 2,
                    tabBarBadgeStyle: {backgroundColor: 'red'},
                   
                }}
            />
            
            <Tab.Screen name="Contacts" component={ContactScreen}/>
        </Tab.Navigator>
    )
}

export default BottomNavigation;