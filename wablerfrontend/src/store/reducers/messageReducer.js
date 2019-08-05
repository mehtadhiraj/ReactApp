import { ADD_MESSAGE, REMOVE_MESSAGE, GET_MESSAGE } from "../actionTypes";

const DEFAULT_MESSAGE = [];

export default function messageReducer (state = DEFAULT_MESSAGE, action) {
    switch (action.type) {
        case GET_MESSAGE:
            return action.message
            
        case ADD_MESSAGE:
            return [...state, action.message]    

        case REMOVE_MESSAGE:
            let messages = state.filter(()=>{ return state.id !== action.message.id })
            return messages;
        default:
            return state;
    }
} 