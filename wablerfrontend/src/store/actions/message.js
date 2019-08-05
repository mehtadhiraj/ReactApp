import { REMOVE_MESSAGE, GET_MESSAGE } from "../actionTypes";
import { apiCall } from "../../services/api";

export function getMessage(message){
    return {
        type: GET_MESSAGE,
        message
    }
}

export function removeMessage(message){
    return {
        type: REMOVE_MESSAGE,
        message
    }
}

export function getMessageAction(method, route, data) {
    return dispatch => {
        return new Promise((resolve, reject)=>{
            return apiCall(method, route, data).then((res=>{
                console.log(res.allMessage);
                dispatch(getMessage(res.allMessage));
            })).catch((error)=>{
                return error
            })
        })
    }
}



