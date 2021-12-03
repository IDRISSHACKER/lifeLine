import * as type from "../types"

const initialState = []

export default function chartDayReducer(state = initialState, action){
    switch(action.type){
        case type.GET_CHART_DAY_REQUESTED:
            return action.payload
        default:
            return state
    }
}