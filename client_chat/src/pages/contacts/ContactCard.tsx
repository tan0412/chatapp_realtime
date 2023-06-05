import React from "react";
import { View, Text, StyleSheet,Image, TouchableOpacity } from "react-native";

type ContactCardProps = {
    _id: string,
    name: string,
    uriImage: string,
    action: (_id: string, uriImage: string, name: string) => void,
}

const ContactCard = (props: ContactCardProps) => {
    return (
        <TouchableOpacity style={styles.messageCard} onPress={() => {props.action(props._id, props.uriImage, props.name)}}>
            <View style={styles.avt}>
                <Image source={{uri: `data:image/png;base64,${props.uriImage}`}} style={{width: 45, height: 45, borderRadius: 50}} />
            </View>
            <View style={styles.content}>
                <Text style={styles.textMessage}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    messageCard: {
        flexDirection:'row', 
        height: 70,
        borderTopWidth: 1,
        borderColor: '#FCFCFC',
        alignItems: 'center',
        backgroundColor: '#FCFCFC'
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
        right: 20,
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#4CAF50'
    }
})

export default ContactCard