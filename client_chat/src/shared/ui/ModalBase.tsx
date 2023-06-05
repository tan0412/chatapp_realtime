import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import IconBack from '../../shared/icons/ic_back.svg'
import IconSearch from '../icons/ic_search.svg'
import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList} from 'react-native';
import BaseTextInput from './BaseTextInput';
import { normalize } from '../../utils/responsive';
import { useDispatch } from 'react-redux';
import { searchUserAction } from '../../redux/actions/SearchAction';
import { useAppSelector } from '../../redux/Store';
import UserBase from './UserBase';
import Loading from './Loading';
import getToken from '../../data/AsyncStorage';
import axiosClient from '../../api/axiosClient';


type ModalBaseProps = {
  visible: boolean;
  toggleModal: () => void;
 
  searchText?: string;
}

const ModalBase = (props: ModalBaseProps,) => {
const dispatch = useDispatch()
 const [data, setData] = useState({})
 const [isLoading, setIsLoading] = useState(true)
 const [text, setText] = useState('')
 useEffect(() => {
    dispatch(searchUserAction(text))
 },[text])
 const user = useAppSelector(state => state.search.userData)
 const id = user?._id
const name = user?.name
const phone = user?.phone
const picture = user?.picture
 useEffect(() => {
  if(user) {
    setIsLoading(false)
  }
 },[])
 const addFriend = async (_id: string) => {
    try {
        const token = await getToken();
        await axiosClient.post('/user/friend-request', {_id}, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        ).then((response) => {
          console.log(response.status)
        })
        
    } catch (error) {
        console.log(error);
    }
 }
    return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.visible}
        onRequestClose={props.toggleModal}
      >
        <View style={styles.headerSearch}>
            <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.icon} onPress={props.toggleModal}>
                    <IconBack width={30} height={30} fill={'#fff'}/>
                </TouchableOpacity>
            </View>
         
            <View style={styles.search}>
                <BaseTextInput 
                icon={<IconSearch />}
                placeholder={'Search'}
                boxstyle={styles.box}
                onChangeText={(text) => setText(text)}
                />
            </View>
        </View>
         { isLoading ? <Loading /> :
        <UserBase
            _id={id}
            name={name} 
            phone={phone} 
            uriImage={picture} 
            action={addFriend}
            />
            }
        </Modal>
        </View>
    
    )   
}

export default ModalBase;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  box: {
    width: normalize(250),
    height: 40,
    borderRadius:6,
    borderColor: '#FFF',
    backgroundColor: '#fff'
  }, 
  headerSearch: {
    height: normalize(70),
    backgroundColor: '#F5591F',
    flexDirection: 'row',
    width: '100%'
  },
  viewIcon: {
    flex: 0.15,
    justifyContent:'center',
    
  } ,
  icon: {
    alignSelf: 'center'
  },
  search: {
    flex: 0.7,
   justifyContent:'center',
   alignItems:'center'
  },
 
});