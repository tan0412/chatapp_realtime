import React, {useState, } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PageProps } from "../../shared/type/PageProps";
import IconLogo1 from '../../../src/shared/icons/ic_logo1.svg';
import IconEmail from '../../../src/shared/icons/ic_email.svg';
import IconPass from '../../../src/shared/icons/ic_password.svg';
import BaseTextInput from "../../shared/ui/BaseTextInput";
import BaseButton from "../../shared/ui/BaseButton";
import { CommonActions } from "@react-navigation/native";
import { NAVIGATIONS_ROUTE } from "../../navigation/Routes";
import { normalize } from "../../utils/responsive";
import axiosClient from "../../api/axiosClient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import { getUserInfoAction } from "../../redux/actions/UserAction";
import { useDispatch } from "react-redux";


const LoginScreen = ({navigation} : any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const handleNav = () => {
        navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.SCREEN_REGISTER}))
    }
    const handleConfirm = async () => {
        try{
           
        const deviceToken  = await messaging().getToken() 
        
         await axios.post('http://192.168.13.107:8080/login', {email, password, deviceToken})
        .then ( (res) => {
           
            if(res.status===200) {
                AsyncStorage.setItem('token', res.data.token);
                Alert.alert('Login successful')
                dispatch(getUserInfoAction())
                navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION,{name: NAVIGATIONS_ROUTE.SCREEN_HOME}))
            }
            else if (res.status===201) {
                Alert.alert('Account does not exist')
            } else {
                Alert.alert('Password does not match')
            }
        })} catch(err) {
            console.log(err)
        }
       
    }
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#F5591F', '#F5891F']} style={styles.linearGradient}>
                <IconLogo1 style={{width: 40, height: 43}}/>
            </LinearGradient>
            <View style={styles.content}>
            <View style={styles.btn}>
                <BaseTextInput 
                icon={<IconEmail/>}
                placeholder={'Email'}
                boxstyle={styles.box}
                onChangeText={(text) => setEmail(text)}
                />
            </View>
            
            <View style={styles.btn}>
                <BaseTextInput 
                    icon={<IconPass/>}
                    placeholder={'Password'}
                    boxstyle={styles.box}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <View style={styles.forgotPass}>
                <Text style={styles.textForgot}>Forgot Password?</Text>
            </View>
            <View style={styles.login}>
                <LinearGradient colors={['#F5591F', '#F2851E']} style={styles.loginButton}>
                    <BaseButton 
                    title={'LOGIN'}  
                    containerStyle={styles.loginButton}  
                    titleStyle={styles.titleLogin}
                    action = {handleConfirm}         
                />
                </LinearGradient>
            </View>
            <View style={styles.footer}>
                <Text style={styles.firstFooter}>Don't have an account? </Text>
                <TouchableOpacity onPress={handleNav}>
                    <Text style={styles.secondFooter}>Register </Text>
                </TouchableOpacity>
            </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    linearGradient: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 80,
    },
    content: {
        flex: 0.6,
        marginVertical: 40,
        alignItems: 'center',
       
    },
    btn: {
        marginVertical: 10,
    },
    box: {
        width: 320,
        height: 42,
        borderColor: '#f2f2f2',
        borderRadius: 20,
    },
    forgotPass: {
       alignSelf :'flex-end',
       marginHorizontal: normalize(30),   
    },
    textForgot: {
        fontSize: 14,
        fontFamily:'medium',
        color: '#000'
    },
    login: {
        flex: 1,
        justifyContent: 'center',
    },
    loginButton: {
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#f2f2f2',
        borderRadius: 20,
        width: normalize(300),
        height: 42,
    },
    titleLogin: {
        fontSize: 14,
        fontFamily:'medium',
        color: '#fff',
        fontWeight: 'bold',

    },
    footer: {
        flex: 0.1,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    firstFooter: {
        fontSize: 12,
        fontFamily:'medium',
        color: '#000',
    },
    secondFooter: {
        fontSize: 12,
        fontFamily:'medium',
        color: '#F5591F',
    }
    
})

export default LoginScreen