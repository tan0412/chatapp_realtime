import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native"
import Header from "../../shared/ui/Header";
import { CommonActions } from "@react-navigation/native";
import ReceivedFriendCard from "./components/ReceivedFriendCard";
import SentFriendCard from "./components/SentFriendCard";
import { resFriend, sentFriend } from "../../api/user_api";
import { User } from "../../data/models/Users";
import axios from "axios";
import axiosClient from "../../api/axiosClient";
import getToken from "../../data/AsyncStorage";


const FriendRequestScreen = ({navigation}: any) => {
    const [isChecked, setIsChecked] = useState(true)
    const [dataRes, setDataRes] = useState([])
    const [dataSent, setDataSent] = useState([])
    const dynamicSentStyle = isChecked ? {color: "#F5591F", fontWeight: 'bold', } : {color: '#C0C0C0'}
    const dynamicReceiveStyle = !isChecked? {color: "#F5591F", fontWeight: 'bold'} : {color: '#C0C0C0'}
    const handleNav = () => {
        navigation.dispatch(CommonActions.goBack)
    }
    const resButton = async (status: string, sender: string) => {
        const token = await getToken()
        await axiosClient.put('/user/friend-request/accepted', {status, sender}, {
            headers :{
                Authorization: `Bearer ${token}`,
            }
        })
    }

    const cancelButton = async (_id: string) => {
        try {
        const token = await getToken()
        await axiosClient.post('/user/friend-request/cancel', {_id}, {
            headers :{
                Authorization: `Bearer ${token}`,
            }
        })}  catch (error) {
            console.error(error)
        }
    }
    useEffect (() => {
        const res = resFriend();
        res.then((res) => {
             setDataRes(res);
        })
     }, [dataRes]);
     
     useEffect (() => {
        const sent = sentFriend();
        sent.then((res) => {
             setDataSent(res);
        })
     }, [dataSent]);
     
    return (
        <View style={styles.container}>
            <Header  
                handleNav={handleNav}
                title={'Lời mời kết bạn'}
            />
            <View style={styles.content}>
                <Pressable style={[styles.receive, !isChecked ? {borderBottomColor: "#F5591F", } : {borderBottomColor: "#C0C0C0", }]} onPress={() => {setIsChecked(false)}}>
                    <Text style={[styles.text, dynamicReceiveStyle]}>ĐÃ NHẬN</Text>
                </Pressable>
                <Pressable style={[styles.sender,  isChecked ? {borderBottomColor: "#F5591F"} : {borderBottomColor: "#C0C0C0"}]} onPress={() => {setIsChecked(true)}}>
                    <Text style={[styles.text, dynamicSentStyle]}>ĐÃ GỬI</Text>
                </Pressable>
            </View>
            { !isChecked ? 
            <View style={styles.receiveView}>
                  {dataRes?.map((item : any, index: any) => {
                    return(
                        <ReceivedFriendCard 
                        _id={item._id}
                        key={item._id}
                        name={item.name}
                        phone={item.phone}
                        uriImage={item.picture} 
                        action={resButton}
                        />
                    )
                  }
                    
                  )}
            </View> : 
            <View style={styles.sentView}>
                {dataSent?.map((item : any, index: any) => {
                    return(
                        <SentFriendCard 
                        _id={item._id}
                        key={item._id}
                        name={item.name}
                        phone={item.phone}
                        uriImage={item.picture} 
                        action={cancelButton}
                        />
                    )
                  }
                    
                  )}
            </View>}
        </View>
    )
}

export default FriendRequestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f2f2',

    },
    content: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#fff',
       
       
    },
    receive: {
        flex: 0.5,
        alignItems:'center',
        borderBottomWidth: 1,
        justifyContent:'center'
    },
    sender: {
        flex: 0.5,
        alignItems:'center',
        borderBottomWidth: 1,
        justifyContent:'center'
    },
   receiveView: {
        marginTop: 10,
   }

})

function asyns() {
    throw new Error("Function not implemented.");
}
