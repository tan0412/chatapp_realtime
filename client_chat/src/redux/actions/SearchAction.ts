import { ReduxGetSearchUser, ReduxGetUserActionType } from "../Types";

export function searchUserAction (payload: string) : ReduxGetSearchUser {
    return {
        type: ReduxGetUserActionType.SEARCH_USER,
        payload: payload
    }
}

export function searchUserActionSuccess (payload: any )  {
    return {
        type: ReduxGetUserActionType.SEARCH_USER_SUCCESS,
        payload: payload
    }
}