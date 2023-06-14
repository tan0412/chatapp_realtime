import axios from 'axios'
import { API_URL} from './constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axiosClient = axios.create({
    baseURL: API_URL,
})
axiosClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
    })
    
    export default axiosClient;
