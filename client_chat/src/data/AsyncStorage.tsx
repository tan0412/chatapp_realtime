import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error(error);
}
}

export default getToken;