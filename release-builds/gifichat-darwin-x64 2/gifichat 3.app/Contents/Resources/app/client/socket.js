import io from 'socket.io-client';
import store from './store';
import { getMessage } from './store/messages'

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-message', message => {
    store.dispatch(getMessage(message));
  });

});

export default socket;
