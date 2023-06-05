
import { all } from 'redux-saga/effects'
import getSaga from './saga/UserSaga'
import getSearchSaga from './saga/SearchSaga'

function* rootSaga() {
    yield all ([
        getSaga(),
        getSearchSaga()
    ])
}

export default rootSaga