import { PreventRemoveContext } from '@react-navigation/native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import io from 'socket.io-client'
import { useAppSelector } from '../../redux/Store'
import axios from 'axios'
import { getMessageData } from '../../api/user_api'
import getToken from '../../data/AsyncStorage'
import { Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import AvatarHeader from './components/Avatar'
import { StyleSheet } from 'react-native'
import axiosClient from '../../api/axiosClient'


const socket = io('http://192.168.61.103:8080')

const MessageScreen = ({route} : any) =>  {
  const [messages, setMessages] = useState<any>([]);
  
  const [user, setUser] = useState<{_id: string}>()
  const {recipientId, picture, name, isAction} = route.params;
  const data = useAppSelector(state => state.user.userData)
  const userId = data._id
  useEffect(() => {
    setUser({ _id: userId});
    socket.emit('joinChat', {userId}) 
    socket.on('receiveMessage', (message) => {
      const newMessage = [{
        _id: message._id,
        text: message.content,
        createdAt: message.timestamp,
        user: { _id: message.sender }
      }]
      setMessages((previousMessages: { _id: any; text: any; createdAt: any; user: { _id: any } }[] | undefined) => GiftedChat.append(previousMessages, newMessage));
   })
    return () => {
      socket.emit('leaveChat', {userId})
    }
  }, []); 
 
  useEffect(() => {
    let isMounted = true;
  
    const fetchApi = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`http://192.168.61.103:8080/user/message/${recipientId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (isMounted) {
          const newArr = response.data.map((obj: any) => ({
            _id: obj._id,
            text: obj.content,
            createdAt: obj.timestamp,
            user: { _id: obj.sender }
          }));
          setMessages(newArr);
          console.log(messages);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchApi();
  
    return () => {
      isMounted = false;
    };
  }, []);
  
  const onSend = (newMessages = []) => {
   setMessages(GiftedChat.append(messages,newMessages))
   socket.emit('sendMessage', { message: newMessages[0].text, recipient: recipientId, sender: userId})
  }

  const renderCustomView = () => {
    return (
        <Avatar
          rounded
          source={{ uri: `data:image/png;base64,${picture}` }}
        />
    );
  };
  
  return (
    <View style={styles.container}>
    <AvatarHeader name={name} picture={picture} isAction = {isAction}/>
    <GiftedChat
      messages={messages}
      onSend={(messages: never[]) => onSend(messages)}
      user={
       user                               
      }
      renderAvatar={renderCustomView}
    />
    </View>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})