// Important to configure the store.
import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import rootReducers from './reducers';

// Configuring store to apply redux devtools and thunk middlewares
export function StoreConfiguration(){
    return createStore(
        rootReducers, 
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )
}