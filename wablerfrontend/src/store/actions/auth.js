import {CURRENT_USER} from '../actionTypes';
import {apiCall, setHeaders} from '../../services/api';
import { addError, removeError } from "../actions/error";

export function setAuthorization(token){
    setHeaders(token);
}

export function setUser(user){
    return{
        type: CURRENT_USER,
        user
    }
}

export function handleLogout(){
    return dispatch=>{
        localStorage.clear();
        setAuthorization(false);
        dispatch(setUser({}));
    }
}

export function setUserAction(method, route, userdata){
    return dispatch => {
        // Returning promise to handle Submit function ofthe form.
        return new Promise((resolve, reject)=>{
            // Calling and userLogin api to login and signup
            return apiCall(method, route, userdata).then((userData)=>{
                // Storing token in localstorage on successfull request
                localStorage.setItem('jwtToken', userData.token);
                setAuthorization(userData.token);
                // Dispatching set user to set the state of currentUser to {isAuthenticated: true, user: UserData}
                dispatch(setUser(userData));
                dispatch(removeError());
                resolve();
            }).catch(error=>{
                console.log(error)
                dispatch(addError(error))
                return reject(error);
            }) 
        }) 
    }
}