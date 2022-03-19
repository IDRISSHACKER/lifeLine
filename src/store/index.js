import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getGroups } from './Action/goupe.action';
import { getUsers } from './Action/users.action';
import { getMessages } from './Action/message.action';
import { getAdmin } from './Action/admin.action';
import { getChartMonth } from './Action/chartMonth.action';
import { getChartDay } from './Action/chartDay.action';

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(reducer, applyMiddleware(thunk));
const persister = 'Store';

store.dispatch(getGroups())
store.dispatch(getUsers())
store.dispatch(getMessages())
store.dispatch(getAdmin())
store.dispatch(getChartMonth())
store.dispatch(getChartDay())

export { store, persister };

