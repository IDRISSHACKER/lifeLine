import * as type from "../types"

const initialState = []

export default function imageReducer(state = initialState, action){
    switch(action.type){
        case type.SET_IMAGE_REQUESTED:
            return action.payload
        default:
            return state
    }
}