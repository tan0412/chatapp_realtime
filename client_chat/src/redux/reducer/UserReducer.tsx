import { AnyAction } from "redux"
import { User } from "../../data/models/Users"
import { ReduxGetUserActionType } from "../Types"

 const initialState : any= {
    userData: {},
 }

 export default function getUserReducer ( state = initialState, action: AnyAction) {
    switch (action.type) {
        case ReduxGetUserActionType.GET_USER_INFOR_ACTIONS : 
        return {
            ...state,
        }
        case ReduxGetUserActionType.GET_USER_INFOR_SUCCESS_ATIONS :
            return {
                ...state,
                userData: action.payload
            }
        default: 
        return state;
    }
 }