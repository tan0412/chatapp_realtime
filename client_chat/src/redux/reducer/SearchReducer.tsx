import { AnyAction } from "redux"
import { User } from "../../data/models/Users"
import { ReduxGetUserActionType } from "../Types"

 const initialState : any= {
    userData: {},
 }

 export default function searchReducer ( state = initialState, action: AnyAction) {
    switch (action.type) {
        case ReduxGetUserActionType.SEARCH_USER_SUCCESS :
            return {
                ...state,
                userData: action.payload
            }
        default: 
        return state;
    }
 }