import {SET_ERROR, REMOVE_ERROR} from '../actionTypes';

export function removeError(){
    return {
        type: REMOVE_ERROR
    }
}

export function addError(error){
    return {
        type: SET_ERROR,
        error
    }
}
