import React, {useState} from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PageProps } from "../../shared/type/PageProps";
import IconLogo1 from '../../../src/shared/icons/ic_logo1.svg';
import IconEmail from '../../../src/shared/icons/ic_email.svg';
import IconPass from '../../../src/shared/icons/ic_password.svg';
import IconPhone from '../../../src/shared/icons/ic_phone.svg';
import IconPerson from '../../../src/shared/icons/ic_person.svg';
import BaseTextInput from "../../shared/ui/BaseTextInput";
import BaseButton from "../../shared/ui/BaseButton";
import { CommonActions } from "@react-navigation/native";
import { NAVIGATIONS_ROUTE } from "../../navigation/Routes";
import { userSignUp } from "../../api/user_api";
import axios from "axios";
import axiosClient from "../../api/axiosClient";

const RegisterScreen = ({navigation} : any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const handleNav = () => {  
        navigation.dispatch(CommonActions.navigate({name: NAVIGATIONS_ROUTE.SCREEN_LOGIN}))
    }

    const handleSignUp = async () => {
       await axiosClient.post('/register', {name, email, password, phone})
        .then((res) => {
         if (res.status === 200) {
            Alert.alert('Register successfully')
            handleNav()
         } 
        if (res.status === 201) {
            Alert.alert('Account already exists')
         }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#F5591F', '#F5891F']} style={styles.linearGradient}>
                <IconLogo1 style={{width: 40, height: 43}}/>
            </LinearGradient>
            <View style={styles.content}>
            <View style={styles.btn}>
                <BaseTextInput 
                icon={<IconPerson/>}
                placeholder={'Username'}
                value={name}
                onChangeText={(text) => setName(text)}
                boxstyle={styles.box}
                />
            </View>
            
            <View style={styles.btn}>
                <BaseTextInput 
                    icon={<IconEmail/>}
                    placeholder={'Email'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    boxstyle={styles.box}
                />
            </View>
            <View style={styles.btn}>
                <BaseTextInput 
                    icon={<IconEmail/>}
                    placeholder={'Phone Number'}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    boxstyle={styles.box}
                />
            </View>
            
            <View style={styles.btn}>
                <BaseTextInput 
                    icon={<IconPass/>}
                    placeholder={'Password'}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    boxstyle={styles.box}
                />
            </View>
            
            <View style={styles.login}>
                <LinearGradient colors={['#F5591F', '#F2851E']} style={styles.loginButton}>
                    <BaseButton 
                    title={'REGISTER'}  
                    containerStyle={styles.loginButton}  
                    titleStyle={styles.titleLogin}
                    action={() => handleSignUp()}           
                />
                </LinearGradient>
            </View>
            <View style={styles.footer}>
                <Text style={styles.firstFooter}>Already a member? </Text>
                <TouchableOpacity onPress={handleNav} >
                    <Text style={styles.secondFooter}>Login </Text>
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
        flex: 1,
        marginTop: 30,
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
        alignSelf: 'flex-end',
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
        width: 300,
        height: 42,
    },
    titleLogin: {
        fontSize: 14,
        fontFamily:'medium',
        color: '#fff',
        fontWeight: 'bold',

    },
    footer: {
        flex: 0.2,
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

export default RegisterScreen