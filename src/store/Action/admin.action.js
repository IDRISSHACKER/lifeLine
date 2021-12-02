import * as type from "../types"
import settings from "../../utils/settings"
import axios from "axios"

const set = new settings().init()

export const getAdmin = () => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=admin')
            .then(res => dispatch({ type: type.GET_ADMIN_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

export const updateAdmin = (data) => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=updateAdmin', data)
            .then(res => dispatch({ type: type.UPDATE_ADMIN_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}
