import React from "react";
import { View, Text, StyleSheet,Image, TouchableOpacity } from "react-native";
import { normalize } from "../../../utils/responsive";

type MessageCardProps = {
    _id: string;
    name: string,
    lastMessage: string,
    uriImage: any,
    time: string,
    isAction: string,
    action: (name: string, _id: string, uriImage: string, isAction: string) => void,
}

const MessageCard = (props: MessageCardProps) => {
    return (
        <TouchableOpacity style={styles.messageCard} onPress={() => {props.action(props._id, props.name, props.uriImage, props.isAction)}}>
            <View style={styles.avt}>
                <Image source={{uri:`data:image/png;base64,${props.uriImage}`}} style={{width: 45, height: 45, borderRadius: 50}} />
                {props.isAction === 'online' && (
                    <View style={styles.active}/>
                )}
            </View>
            <View style={styles.content}>
                <Text style={styles.textMessage}>{props.name}</Text>
                <View style={styles.row}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.textContent, styles.message]}>{props.lastMessage}</Text>
                    <View style={styles.time}>
                        <Text style={styles.textContent}>{props.time}</Text>
                     </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    messageCard: {
        flexDirection:'row', 
        height: 70,
        borderTopWidth: 1,
        borderColor: '#f2f2f2',
        alignItems: 'center',
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
    },
    row: {
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    message: {
        flex: 0.7,
    }, 
    time: {
        flex: 0.2,
        alignItems:'center',
    },
    active: {
        position: 'absolute',
        top: 0,
        right: normalize(20),
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#4CAF50'
    }
})

export default MessageCard