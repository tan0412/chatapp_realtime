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
import { normalizePlatforms } from '../../../utils/responsive';

type TextInputComponentProps = {
    name: string,
    value?: string,
    onChangeText: (text: string) => void;
}
const TextInputComponent = (props: TextInputComponentProps) => {
    return (
        <View style={[styles.container]} >
            <Text style={[styles.text]}>{props.name}</Text>
            <View style={[styles.input]}>
            <TextInput 
                style={styles.textInput}
                onChangeText={(text: string)=> props.onChangeText(text)}
                value={props.value}
                />
            </View>
        </View>
    )
}

export default TextInputComponent;

const styles = StyleSheet.create({
    container: {
        marginTop: normalizePlatforms(20),
        marginHorizontal: 25,
        marginVertical: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#cccccc'
    },
    input: {
        borderBottomWidth: 1,
        marginTop: 5,
        borderColor: '#cccccc',
    },
    textInput: {
        padding: 0,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    }
    
});