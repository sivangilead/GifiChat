import axios from 'axios'
import history from '../history'
import socket from '../socket';



const defaultMessage = {
    newMessageEntry: '',
    messages: [],
    name: 'sivan'
}
// ACTION TYPES
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GET_MESSAGE = 'GET_MESSAGE'
const UPDATE_NAME = 'UPDATE_NAME';


// ACTION CREATORS
export const updateName = (name) => {
    return { type: UPDATE_NAME, name };
}

export const writeMessage = (content) => {
    return { type: WRITE_MESSAGE, content };
}

export const getMessage = (message) => {
    return { type: GET_MESSAGE, message };
}

export const postMessage = (gitName, name) => {
    console.log(name)
    return async (dispatch) => {
        const response = await axios.get(`/api/gif/${name}/${gitName}`);
        const newMessage = response.data;
        const action = getMessage(newMessage);
        dispatch(action);
        // also a possibility!
        // const clearMessageAction = writeMessage('')
        // dispatch(clearMessageAction)
        socket.emit('new-message', newMessage);
    }
}

export default function (state = defaultMessage, action) {
    switch (action.type) {
        case GET_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            };
        case WRITE_MESSAGE:
            return {
                ...state,
                newMessageEntry: action.content
            };

        case UPDATE_NAME:
            return {
                ...state,
                name: action.name
            };
        default:
            return state
    }
}