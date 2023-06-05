import { CommonActions } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from "react-native"
import { NAVIGATIONS_ROUTE } from "../../navigation/Routes";
import IconEdit from '../../shared/icons/ic_edit.svg';
import IconSearch from '../../shared/icons/ic_search.svg';
import BaseTextInput from "../../shared/ui/BaseTextInput";
import MessageCard from "./components/MessageCard";
import { useAppSelector } from "../../redux/Store";
import ModalBase from "../../shared/ui/ModalBase";
import getToken from "../../data/AsyncStorage";
import axios from "axios";
import { makeMutable } from "react-native-reanimated";
import axiosClient from "../../api/axiosClient";

const HomeScreen = ({navigation} : any) => {
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("");
    const data = useAppSelector(state => state.user.userData)
    const [listChat, setListChat] = useState([]) 
    useEffect(() => {
        const fetchApi = async () => {
          try {
            const token = await getToken();
            const response = await axios.get(`http://192.168.13.107:8080/chatroom`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            
            setListChat(response.data)
          } catch (err) {
            console.error(err);
          }
        };
        fetchApi();
      }, [listChat]);
      
     
   
      const handleNavMessage = (recipientId: string, name: string, urlImage: string, isAction: string)  => {
        navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.SCREEN_MESSAGE, params: {recipientId : recipientId,name: name,picture: urlImage, isAction: isAction }}))
      }
    const handleEditProfile = () => {
        navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.SCREEN_PROFILE}))
    }
    const toggleModal = () => {
        setIsVisible(prev => !prev)
    }

    const renderItem = ({ item }: any ) => {
        const recipientId = item.users[0]?._id
        const userName = item.users[0]?.name || undefined;
        const userPicture = item.users[0]?.picture || undefined;
        const lastMessageContent = item.messages[0]?.content || undefined;
        const lastMessageTimestamp = item.messages[0]?.timestamp || undefined;
        const status = item.users[0]?.status || undefined; 
        const currentDate = new Date ()
        let timestamp : string 
        if (lastMessageTimestamp) {
            const objDate = new Date(lastMessageTimestamp)
            if (objDate.getDay() === currentDate.getDay() &&
            objDate.getMonth() === currentDate.getMonth() &&
            objDate.getFullYear() === currentDate.getFullYear()) {
                const hours = objDate.getHours()
                const minutes = objDate.getMinutes()
                timestamp = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0')
            } else {
                const day = objDate.getDate()
                const month = objDate.getMonth() + 1
                timestamp = day.toString() + ' ' + 'thg' + ' ' + month.toString()
            }
        } else {
            timestamp = ''
        }
        
        return (
          <MessageCard
            _id = {recipientId}
            name={userName}
            uriImage={userPicture}
            lastMessage={lastMessageContent}
            time={timestamp}
            action={handleNavMessage}
            isAction={status}
          />
        );
      };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avt}>
                    <Image source={{uri: `data:image/png;base64,${data.picture}`}} style={styles.avt} />
                </View>
                <Text style={styles.textHeader}>Stream Chat</Text>
                <TouchableOpacity style={styles.edit} onPress={handleEditProfile}>
                    <IconEdit />
                </TouchableOpacity>
            </View>
            <View style={styles.search}>
                <BaseTextInput 
                icon={<IconSearch />}
                placeholder={'Search'}
                boxstyle={styles.box}
                onChangeText={(text) => setText(text)}
                onFocus={toggleModal}
                />
            </View>
            <View>
                <FlatList 
                    data={listChat}
                    renderItem={renderItem}
                    
                />
            </View>
         
            <ModalBase visible={isVisible} toggleModal={toggleModal} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }, 
    header: {
        height: 66,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor: '#f2f2f2'
    },
    avt: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginHorizontal: 5,
    },
     edit: {
        marginHorizontal: 5,
     },
    textHeader: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000'
    },
    search: {
        alignItems:'center', 
        marginVertical: 10
    },
    box:{
        width: 350,
        height: 40,
        borderColor: '#f2f2f2',
        borderRadius: 20,
    }
})

export default HomeScreen