import * as type from "../types"
import settings from "../../utils/settings"
import axios from "axios"

const set = new settings().init()

export const getUsers = () => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=getUsers')
            .then(res => dispatch({ type: type.GET_USERS_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

export const setUser = (data) => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=setUser', data)
            .then(res => dispatch({ type: type.SET_USERS_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

export const removeUser = (id) => {
    const data = new FormData();
    data.append("id", id)
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=removeUser', data)
            .then(res => dispatch({ type: type.REMOVE_USERS_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}