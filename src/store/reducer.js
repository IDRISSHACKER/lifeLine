import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import usersReducer from './Reducer/users.reducer'
import groupeReducer from './Reducer/groupe.reducer';
import messengerReducer from './Reducer/message.reducer';
import adminReducer from './Reducer/admin.reducer';
import chartMonthReducer from './Reducer/ChartMonth.reducer';
import chartDayReducer from "./Reducer/ChartDay.reducer"
import imageReducer from './Reducer/image.reducer';
import languageReducer from './Reducer/languageReducer';
import champReducer from './Reducer/champ.reducer';
import msgReducer from './Reducer/allMsg.reducer';

const reducer = combineReducers({
    customization: customizationReducer,
    usersReducer: usersReducer,
    groupeReducer: groupeReducer,
    messengerReducer: messengerReducer,
    adminReducer: adminReducer,
    chartMonthReducer: chartMonthReducer,
    chartDayReducer,
    imageReducer,
    languageReducer,
    champReducer,
    msgReducer
});

export default reducer;
