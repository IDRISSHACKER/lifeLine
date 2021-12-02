import * as type from "../types"

const initialState = []

export default function groupeReducer(state = initialState, action){
    switch(action.type){
        case type.GET_GROUPS_REQUESTED:
            return action.payload
        case type.SET_GROUP_REQUESTED:
            return action.payload
        case type.REMOVE_GROUP_REQUESTED:
            return action.payload
        default:
            return state
    }
}