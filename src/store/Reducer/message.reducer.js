import * as type from "../types"

const initialState = []

export default function messengerReducer(state = initialState, action){
    switch(action.type){
        case type.GET_MESSAGES_REQUESTED:
            return action.payload
        case type.SET_MESSAGE_REQUESTED:
            return action.payload
        case type.REMOVE_MESSAGE_REQUESTED:
            return action.payload
        default:
            return state
    }
}