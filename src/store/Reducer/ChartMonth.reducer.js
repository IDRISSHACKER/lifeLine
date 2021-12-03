import * as type from "../types"

const initialState = []

export default function chartMonthReducer(state = initialState, action){
    switch(action.type){
        case type.GET_CHART_MONTH_REQUESTED:
            return action.payload
        default:
            return state
    }
}