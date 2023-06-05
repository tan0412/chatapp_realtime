import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import BottomNavigationItem from './BottomNavigationItem';

const TabBar = ({state, descriptors, navigation}: any) => {
    return(
        <View style={styles.container}>
            {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
       
        return (
          <View key={index} style={[styles.mainContainer]}>
            <Pressable onPress={onPress}>
              <BottomNavigationItem isActive={isFocused} name={label} />
            </Pressable>
          </View>
        );
      })}
        </View>
    )

    
}
  
  export default TabBar;

   const styles = StyleSheet.create({
        container: {
          height: 80,
          alignItems:'center',
          flexDirection: 'row',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#F7F5F9',
          borderColor: 'gray',
          borderWidth: 1,
        },
        mainContainer: {
            flex: 1,
            justifyContent: 'flex-end',
        }
   }) 