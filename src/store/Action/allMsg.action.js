import * as type from "../types"

export const setMsg = (msg = {}) => {
    return (dispatch) => {
        return dispatch({ type: type.SET_MSG, payload: msg })
    }
}

export const resetMsg = () => {
    return (dispatch) => {
        return dispatch({ type: type.SET_MSG, payload: [] })
    }
}
