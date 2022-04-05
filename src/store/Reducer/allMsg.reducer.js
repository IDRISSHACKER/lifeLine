import * as type from "../types"

const initialState = []

export default function msgReducer(state = initialState, action) {
    switch (action.type) {
        case type.SET_MSG:
            return [...state, action.payload]
        case type.RESET_MSG:
            return action.payload
        default:
            return state
    }
}