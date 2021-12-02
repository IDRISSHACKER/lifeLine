import * as type from "../types"
import settings from "../../utils/settings"
import axios from "axios"

const set = new settings().init()

export const getMessages = () => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=getMessages')
            .then(res => dispatch({ type: type.GET_MESSAGES_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

export const setMessages = (data) => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=sendMessage', data)
            .then(res => dispatch({ type: type.SET_MESSAGE_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

export const removeMessage = (data) => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=removeMessage', data)
            .then(res => dispatch({ type: type.REMOVE_MESSAGE_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

