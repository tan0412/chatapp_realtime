import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar, 
  ViewStyle,
  TextInput
} from 'react-native';

type BaseTextInputProps = {
    icon: any,
    placeholder: string,
    rightIcon?: any,
    value?: string,
    isPassword?: boolean,
    onChangeText: (text: string) => void;
    boxstyle?: ViewStyle,
    onFocus?: () => void
}
const BaseTextInput = (props: BaseTextInputProps) => {
    return (
        <View style={[styles.container, props.boxstyle]} >
            <View style={styles.icon}>
                {props.icon}
            </View>
            <TextInput 
                style={styles.textInput}
                placeholder={props.placeholder}
                secureTextEntry={props.isPassword}
                onChangeText={(text: string)=> props.onChangeText(text)}
                value={props.value}
                onFocus={props.onFocus}
                />
            {props.rightIcon}

        </View>
    )
}

export default BaseTextInput;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        flexDirection: 'row',  
        alignItems: 'center',
       
    },
    icon: {
        paddingHorizontal: 15
    },
    textInput: {
        flex: 1,
        paddingLeft: 10, 
    }
});