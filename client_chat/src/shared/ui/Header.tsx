import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput} from 'react-native';
import IconSearch from '../icons/ic_search.svg'
import * as colors from '../theme/colors';
import IconBack from '../icons/ic_back.svg';
import { normalize } from '../../utils/responsive';

type HeaderProps = {
    handleNav: () => void;
    title: string;
    
}
const Header = (props: HeaderProps) => {
   
    
    return (
        <View>  
        <View style={styles.header}>
            <TouchableOpacity onPress={props.handleNav}>
                <IconBack width={30} height={30} fill={'#fff'}/>
            </TouchableOpacity>
            <Text style={styles.textHeader}>{props.title}</Text>
            
        </View>
        
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: colors.primaryOrange,
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal: 20
    }, 
   
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff', 
        marginHorizontal: normalize(30)
    }
})