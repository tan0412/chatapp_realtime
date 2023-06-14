import getToken from "../data/AsyncStorage";
import axiosClient from "./axiosClient";

export const userSignUp = async ({name, email, password} : any) => {
    try {
        const result = await axiosClient.post("/register", {name, email, password});
        return result.data;
    } catch (error) {
        return error;
    }
}

export  const userData = async () => {
    try {
        const result = await axiosClient.get('/users')
       return result.data
    }
    catch (error) {
        return error;
    }
}

export const searchUserData  = async (text: string) => {
    try {
        const results = await axiosClient.get(`/list_user/${text}`)
        return results.data
    } catch (error) {
        return error;
    }
}

export const addFriend = async ({name, phone, picture}: any) => {
    try {
        const results = await axiosClient.post('/user/friend', {name, phone, picture},
        )
        
    } catch (error) {
        console.log(error);
    }
}

export const resFriend = async () => {
    try {
        const token = await getToken();
        const results = await axiosClient.get('/users/friend-request/recipient', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        )
        return results
        
    } catch (error) {
        console.log(error);
    }
}

export const sentFriend = async () => {
    try {
        const token = await getToken();
        const results = await axiosClient.get('/users/friend-request/sent', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        )
        return results
        
    } catch (error) {
        console.log(error);
    }
}

export const getMessageData  = async (text: string) => {
    try {
        const token = await getToken();
        const results = await axiosClient.get(`/user/message/${text}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return results.data
    } catch (error) {
        return error;
    }
}