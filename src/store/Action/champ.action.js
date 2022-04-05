import * as type from "../types"

export const setChamp = (nbChamp) => {
    return (dispatch) => {
        return dispatch({ type: type.SET_CHAMP, payload: nbChamp })
    }
}
