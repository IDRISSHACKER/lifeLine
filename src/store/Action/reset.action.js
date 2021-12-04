import * as type from "../types"
import settings from "../../utils/settings"
import axios from "axios"

const set = new settings().init()

export const reset = () => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=reset')
            .then(res => dispatch({ type: type.RESET_SETTING_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}
