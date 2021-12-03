import * as type from "../types"
import settings from "../../utils/settings"
import axios from "axios"

const set = new settings().init()

export const getChartMonth = () => {
    return (dispatch) => {
        return axios.post(set.APP_URL + '?page=chartMonth')
            .then(res => dispatch({ type: type.GET_CHART_MONTH_REQUESTED, payload: res.data }))
            .catch(err => console.log(err))
    }
}

