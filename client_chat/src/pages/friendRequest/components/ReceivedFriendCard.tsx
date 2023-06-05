import React, {useState} from "react";
import { View, Text, StyleSheet,Image, TouchableOpacity } from "react-native";
import BaseButton from "../../../shared/ui/BaseButton";
import LinearGradient from "react-native-linear-gradient";
import { normalize } from "../../../utils/responsive";

type ReceivedFriendCardProps = {
    _id: string,
    name: string,
    phone: string,
    uriImage?: any,
    action: (text: string, recipient: string) => void,                                                                                                                                                          
}

const ReceivedFriendCard = (props: ReceivedFriendCardProps) => {
   
    return (
        <View style={styles.container}>
            <View style={styles.messageCard}>
                <View style={styles.avt}>
                    <Image source={{uri: `data:image/png;base64,${props.uriImage}`}} style={{width: 45, height: 45, borderRadius: 50}} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.textMessage}>{props.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.textContent]}>Số điện thoại: {props.phone}</Text>
                </View>
            </View>
            <View style={styles.buttonView}>
            <LinearGradient colors={['#F5591F', '#F2851E']} style={styles.buttonLinear}>
                    <BaseButton 
                    title={'TỪ CHỐI'}  
                    containerStyle={styles.button}  
                    titleStyle={styles.titleRespone}
                    action={() => props.action('reject', props._id)}      
                />
                </LinearGradient>
                <LinearGradient colors={['#F5591F', '#F2851E']} style={styles.buttonLinear}>
                    <BaseButton 
                    title={'CHẤP NHẬN'}  
                    containerStyle={styles.button}  
                    titleStyle={styles.titleRespone}
                    action={() => props.action('accepted', props._id)}  
                />
                </LinearGradient>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 130,
        borderColor: '#f2f2f2',
        borderWidth: 1,
        backgroundColor: '#fff'
    },
    messageCard: {
        flexDirection:'row', 
        marginTop: normalize(10)
    },
    avt: {
        flex: 0.25,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        
    },
    textMessage: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },
    textContent: {
        fontSize: 12,
        color: '#7A7A7A',
        marginVertical: normalize(10),
    },
    
    buttonLinear: {
        borderRadius: 20,
        height: 30,
        width: 100,
    },
    button: {
        height: 30,
        width: 100,
        borderWidth: 1,
        borderRadius: 20, 
        borderColor: '#fff',
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        paddingHorizontal: 20,
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around', 
    }, 
    titleRespone: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    }
})

export default ReceivedFriendCard