import {REMOVE_ERROR, SET_ERROR} from '../actionTypes';

// Reducer to add and remove error messages.
export default function errorReducer(state = {message : null}, action) {
    switch (action.type) {
        case SET_ERROR:
            return {...state, message: action.error};
        case REMOVE_ERROR:
            return {...state, message: null};
        default:
            return state;
    }
}