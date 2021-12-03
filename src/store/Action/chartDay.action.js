import * as type from "../types"
import settings from "../../utils/settings"
import axios from "axios"

const set = new settings().init()

export const getChartDay = () => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=chartDay')
            .then(res => dispatch({ type: type.GET_CHART_DAY_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

