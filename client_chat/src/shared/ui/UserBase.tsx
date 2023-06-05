import React, {useState} from "react";
import { View, Text, StyleSheet,Image, TouchableOpacity } from "react-native";

type UserProps = {
    _id: string;
    name: string,
    phone: string,
    uriImage: any,
    action: (_id: string) => void,
    
}

const UserBase = (props: UserProps) => {
    const [isChecked, setIsChecked] = useState(false)
    return (
        <TouchableOpacity style={styles.messageCard}>
            <View style={styles.avt}>
                <Image source={{uri: `data:image/png;base64,${props.uriImage}`}} style={{width: 45, height: 45, borderRadius: 50}} />
            </View>
            <View style={styles.content}>
                <Text style={styles.textMessage}>{props.name}</Text>
                <View style={styles.row}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.textContent, styles.message]}>Số điện thoại: {props.phone}</Text>
                    {!isChecked ?
                    <TouchableOpacity style={styles.button} onPress ={() => {props.action(props._id); setIsChecked(true) }}>
                        <Text style={styles.text}>Kết bạn</Text>
                    </TouchableOpacity>: <></>}
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
    button: {
        height: 30,
        
        borderWidth: 1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20, 
        backgroundColor: '#F2851E',
        borderColor: '#fff',
        marginHorizontal: 20
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        paddingHorizontal: 20,
    }
})

export default UserBase