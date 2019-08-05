import {combineReducers} from 'redux';
import currentUser from './currentUser';
import errorReducer from './error';
import messageReducer from './messageReducer';

// Combinig all the reducers
const rootReducers = combineReducers({
    currentUser,
    errorReducer,
    messageReducer
});

export default rootReducers;