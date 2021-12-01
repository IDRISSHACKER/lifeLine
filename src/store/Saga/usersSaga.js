import { call, put, takeEvery } from "redux-saga/effects"
import settings from "../../utils/settings"

const info = new settings().init()
const app_url = info.APP_URL+"?page=getUsers"

function getApi() {
    return fetch(app_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }.then(response=>response.json)
        .catch(err=>{throw err})
    })
}

function* fetchUsers(action) {
    try{
        const users = yield call(getApi);
        yield put({type: "GET_USERS_SUCCESS", users:users})
    }catch (e) {
        yield put({type: "GET_USERS_FAILED", message:e.message})
    }
}

export function* userSaga() {
    yield takeEvery('GET_USERS_REQUESTED', fetchUsers)
}

export default userSaga