import io from 'socket.io-client';
import store from './store';
import { getMessage, addGuest } from './store/messages'

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

socket.on('new-message', message => {
  store.dispatch(getMessage(message));
});

socket.on('add-guest', list => {
  console.log('guests', list);
  store.dispatch(addGuest(list));
});

socket.on('remove-guest', newlist => {
  console.log('remove-guest', newlist);
  store.dispatch(addGuest(newlist));
});

export default socket;
