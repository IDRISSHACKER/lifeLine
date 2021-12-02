import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import usersReducer from './Reducer/users.reducer'
import groupeReducer from './Reducer/groupe.reducer';
import messengerReducer from './Reducer/message.reducer';
import adminReducer from './Reducer/admin.reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    usersReducer: usersReducer,
    groupeReducer: groupeReducer,
    messengerReducer: messengerReducer,
    adminReducer: adminReducer 
});

export default reducer;
