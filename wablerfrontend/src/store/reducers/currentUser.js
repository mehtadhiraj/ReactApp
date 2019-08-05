import {CURRENT_USER} from '../actionTypes';

const DEFAULT_USER = {
    isAuthenticated: false,
    user: {}
}

// Reducer to set up the current user on login
export default (state = DEFAULT_USER, action) => {
    switch (action.type) {
        case CURRENT_USER:
            // Case to set up current user
            return {
                isAuthenticated : !! Object.keys(action.user).length,
                user: action.user
            }
        default:
            return state;
    }
}