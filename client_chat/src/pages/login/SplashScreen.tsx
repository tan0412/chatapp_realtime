import React, { useEffect } from "react";
import { View, StyleSheet, Text} from "react-native";
import  IconLogo  from '../../shared/icons/ic_logo.svg';
import LinearGradient from "react-native-linear-gradient";
import { PageProps } from "../../shared/type/PageProps";
import { CommonActions } from "@react-navigation/native";
import { NAVIGATIONS_ROUTE } from "../../navigation/Routes";

const SplashScreen = ({navigation}: any) => {
    const handleNavigation = () => {
        navigation.dispatch(CommonActions.navigate({name:NAVIGATIONS_ROUTE.SCREEN_LOGIN}))
    }

    useEffect(() => {
        setTimeout(handleNavigation, 3000)
    }, [])

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#F5591F', '#F2851E']} style={styles.linearGradient}>
                <IconLogo />
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default SplashScreen