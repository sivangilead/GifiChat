import axios from 'axios'
import history from '../history'
import socket from '../socket';



const defaultMessage = {
    newMessageEntry: '',
    messages: [],
    name: '',
    guests: []
}
// ACTION TYPES
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GET_MESSAGE = 'GET_MESSAGE'
const UPDATE_NAME = 'UPDATE_NAME';
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'
const ADD_GUEST = 'ADD_GUEST'


// ACTION CREATORS
export const updateName = (name) => {
    socket.emit('add-guest', name);
    return { type: UPDATE_NAME, name };
}

export const writeMessage = (content) => {
    return { type: WRITE_MESSAGE, content };
}

export const getMessage = (message) => {
    return { type: GET_MESSAGE, message };
}

export const gotMessagesFromServer = (messages) => ({
    type: GOT_MESSAGES_FROM_SERVER,
    messages
});

export const addGuest = (guest) => {
    return { type: ADD_GUEST, guest };
}
export const removeGuest = (guest) => {
    socket.emit('remove-guest', guest)
}



export const fetchMessages = () => {
    return async (dispatch) => {
        const response = await axios.get('/api/gif/');
        const messages = response.data;
        const action = gotMessagesFromServer(messages);
        dispatch(action);
    };
};

export const deleteMessages = () => {
    return async (dispatch) => {
        const response = await axios.delete('/api/gif/');
        const messages = response.data;
        const action = gotMessagesFromServer(messages);
        dispatch(action);
    };
};


export const postMessage = (gifname, name) => {
    console.log(name)
    return async (dispatch) => {
        const response = await axios.post('/api/gif/', { name, gifname });
        const newMessage = response.data;
        const action = getMessage(newMessage);
        dispatch(action);
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
        case GOT_MESSAGES_FROM_SERVER: {
            return { ...state, messages: action.messages };
        }
        case ADD_GUEST: {
            return { ...state, guests: action.guest }
        }
        default:
            return state
    }
}