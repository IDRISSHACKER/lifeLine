import * as type from "../types"

const initialState = []

export default function adminReducer(state = initialState, action){
    switch(action.type){
        case type.GET_ADMIN_REQUESTED:
            return action.payload
        case type.UPDATE_ADMIN_REQUESTED:
            return action.payload
        default:
            return state
    }
}