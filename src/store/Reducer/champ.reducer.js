import * as type from "../types"

const initialState = []

export default function champReducer(state = initialState, action) {
    switch (action.type) {
        case type.SET_CHAMP:
            return action.payload
        default:
            return state
    }
}