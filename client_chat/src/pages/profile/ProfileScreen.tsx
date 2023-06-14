import React, {useEffect, useState, useCallback} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import TextInputComponent from "./components/TextInputComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getToken from "../../data/AsyncStorage";
import axiosClient from "../../api/axiosClient";
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePickerAvatar from "./components/ImagePickerAvatar";
import BaseButton from "../../shared/ui/BaseButton";
import LinearGradient from "react-native-linear-gradient";
import { normalize } from "../../utils/responsive";
import { useAppSelector,  } from "../../redux/Store";
import { userData } from "../../api/user_api";
import { useDispatch } from "react-redux";
import { getUserInfoAction } from "../../redux/actions/UserAction";

const ProfileScreen = () => {
  const dispatch = useDispatch()
   const [userInfo, setUserInfo] = useState({})
   const [pickerRes, setPickerRes] = useState<string | undefined>()
   const [picture, setPicture] = useState<string|undefined>('')
    const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   
   const data = useAppSelector(state => state.user.userData)

  useEffect(() =>{
    setUserInfo(data)
    setName(userInfo.name)
    setEmail(userInfo.email)
    setPhone(userInfo.phone)
  },[userInfo])
 
 const onImageLibrary = useCallback (() => {
  launchImageLibrary({mediaType: 'photo', selectionLimit: 1, includeBase64: true}, (response) => {
    if (response.didCancel) {
      console.log('Người dùng huỷ bỏ chọn hình ảnh');
    } else if (response.errorCode) {
      console.log('Lỗi:', response.errorCode);
    } else {
      if (response?.assets && response.assets.length > 0){
      const asset = response.assets[0];
      setPickerRes(asset.uri);
      setPicture(asset.base64)
      // xử lý hình ảnh ở đây
    }} })
  }, [])

  const handleUpdate = async() => {
     axiosClient.put('/update',{name ,email, phone, picture}
     ).then((res) =>{
        if(res.status === 200) {
          Alert.alert('Update Successfully')
          dispatch(getUserInfoAction())
        }
     })
    }
 
  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
      <ImagePickerAvatar uri={pickerRes} picture={`data:image/png;base64,${data.picture}`} onPress={onImageLibrary} />
      <TextInputComponent 
        name={'Name'}
        value={name}
        onChangeText={(text) =>  setName(text) }
      />
      <TextInputComponent 
        name={'Email'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInputComponent 
        name={'Phone'}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      </View>
      <View style={styles.update}>
        <LinearGradient colors={['#F5591F', '#F2851E']} style={styles.updateButton}>
            <BaseButton 
            title={'UPDATE'}  
            containerStyle={styles.updateButton}  
            titleStyle={styles.titleUpdate}
            action={() => handleUpdate()}
        />
        </LinearGradient>
      </View>
      </View>
  )
}  


export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 25
  },
  
  avt: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf:'center'
},

update: {
  flex: 1,
  justifyContent: 'center',
  alignSelf: 'center'
},
updateButton: {
  borderWidth: 1,
  alignItems: 'center',
  borderColor: '#f2f2f2',
  borderRadius: 20,
  width: normalize(300),
  height: 42,
},
titleUpdate: {
  fontSize: 14,
  fontFamily:'medium',
  color: '#fff',
  fontWeight: 'bold',

},
})