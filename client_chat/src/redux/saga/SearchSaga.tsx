import {call, put, takeEvery} from 'redux-saga/effects'
import { searchUserData } from '../../api/user_api'
import { searchUserAction, searchUserActionSuccess } from '../actions/SearchAction'
import { ReduxGetUserActionType } from '../Types'
function* getSearchUser (action: any): any {
    const data = yield call (searchUserData, action.payload)
    yield put (searchUserActionSuccess(data))
}

function* getSearchSaga (){
    yield takeEvery (ReduxGetUserActionType.SEARCH_USER, getSearchUser)
}


export default getSearchSaga