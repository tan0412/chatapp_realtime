import { User,  } from "../data/models/Users";

export enum ReduxGetUserActionType {
    GET_USER_INFOR_ACTIONS = 'GET_USER_INFOR_ACTIONS',
    GET_USER_INFOR_SUCCESS_ATIONS = 'GET_USER_INFOR_SUCCESS_ATIONS',
    SEARCH_USER = 'SEARCH_USER',
    SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS',
}

export interface ReduxGetUserInfo {
    type: ReduxGetUserActionType;
}

export interface ReduxGetUserInfoSuccess {
    type: ReduxGetUserActionType;
    payload: any;
}

export interface ReduxGetSearchUser {
    type: ReduxGetUserActionType;
    payload: string;
}

export interface ReduxGetSearchUserSuccess {
    type: ReduxGetUserActionType;
    payload: any;
}