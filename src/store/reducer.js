import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import usersReducer from './Reducer/users.reducer'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    usersReducer: usersReducer,
});

export default reducer;
