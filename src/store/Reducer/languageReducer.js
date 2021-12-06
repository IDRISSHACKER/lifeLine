import * as types from '../types';

export const initialState = {
    id: 0,
    language: "fr",
    textes: {
        admin:["administrateur", "administrator"],
        msgSend: ["messages envoyés", "messages sended"],
        statMsgSend: ["statistiques des messages envoyés", "stats of messages sended"]
    }
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LANGUAGE:
            return action.payload
        default:
            return state;
    }
};

export default languageReducer;
