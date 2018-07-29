

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-message', message => {
      console.log('gif', message)
      socket.broadcast.emit('new-message', message);
    });

  });

};
