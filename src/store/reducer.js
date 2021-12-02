import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import usersReducer from './Reducer/users.reducer'
import groupeReducer from './Reducer/groupe.reducer';
import messengerReducer from './Reducer/message.reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    usersReducer: usersReducer,
    groupeReducer: groupeReducer,
    messengerReducer: messengerReducer,
});

export default reducer;
