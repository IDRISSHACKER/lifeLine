import * as type from "../types"

export const setLanguage = (id, language) => {
    return (dispatch) => {
        return dispatch({ type: type.SET_LANGUAGE, id, language  })
    }
}


