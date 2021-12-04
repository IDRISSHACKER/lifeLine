import * as type from "../types"

const initialState = []

export default function usersReducer(state = initialState, action){
    switch(action.type){
        case type.GET_USERS_REQUESTED:
            return action.payload
        case type.SET_USERS_REQUESTED:
            return action.payload
        case type.UPDATE_USER_REQUESTED:
            return action.payload
        case type.REMOVE_USERS_REQUESTED:
            return action.payload
        default:
            return state
    }
}