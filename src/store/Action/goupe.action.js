import * as type from "../types"
import settings from "../../utils/settings"
import axios from "axios"

const set = new settings().init()

export const getGroups = () => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=getGroups')
            .then(res => dispatch({ type: type.GET_GROUPS_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

export const setGroup = (data) => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=setGroup', data)
            .then(res => dispatch({ type: type.SET_GROUP_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

export const removeGroup = (id) => {
    const data = new FormData();
    data.append("id", id)
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=removeGroup', data)
            .then(res => dispatch({ type: type.REMOVE_GROUP_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}