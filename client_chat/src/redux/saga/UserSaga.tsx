import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { userData } from '../../api/user_api'
import { getUserInfoAction, getUserInfoSuccessAction } from '../actions/UserAction'
import { ReduxGetUserActionType } from '../Types'

function* getUserInfo(action: any) : any {
    try {
        const data = yield call (userData) 
        yield put (getUserInfoSuccessAction(data))
    } catch(error) {

    }
}
function* getSaga() {
    yield takeEvery(ReduxGetUserActionType.GET_USER_INFOR_ACTIONS, getUserInfo)
}

export default getSaga