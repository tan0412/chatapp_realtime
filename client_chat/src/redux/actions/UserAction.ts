import { User, } from "../../data/models/Users";
import {  ReduxGetUserActionType, ReduxGetUserInfo, ReduxGetUserInfoSuccess } from "../Types";

export function getUserInfoAction() : ReduxGetUserInfo { 
    
    return {
    type: ReduxGetUserActionType.GET_USER_INFOR_ACTIONS
    }
}

export function getUserInfoSuccessAction(payload: any) : ReduxGetUserInfoSuccess {

    return {
        type: ReduxGetUserActionType.GET_USER_INFOR_SUCCESS_ATIONS,
        payload: payload
    }
}