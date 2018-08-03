

module.exports = io => {
  let list = []

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-message', message => {
      console.log('gif', message)
      socket.broadcast.emit('new-message', message);
    });

    socket.on('add-guest', async guest => {
      list.push(guest)
      await socket.emit('add-guest', list)
      await socket.broadcast.emit('add-guest', list);
    });

    socket.on('remove-guest', async guest => {
      list = list.filter(item => item !== guest)
      await socket.emit('remove-guest', list)
      await socket.broadcast.emit('remove-guest', list);
    });

  });

};
