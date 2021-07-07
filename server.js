const express = require("express");
const socket = require("socket.io");
const http = require("http");
const userService = require("./components/users.js")

const app = express();
const server = http.createServer(app)
const io = socket(server, {
    cors: {
      origin: '*',
    }
  })

const port = process.env.PORT || 6577;

io.on('connection', (socket) => {
    console.log('socket connection is available')
    socket.on('disconnect', (data) => {
        console.log('User Disconnected!')

    })
    socket.on('join', (requestData, callback) => {
      let userData = {
        id : socket.id,
        name : requestData.name,
        room : requestData.room,
      };

      const user = userService.addUser(userData);
      if(user.errorTrue) return callback(user.message);

      // sends a greeting message to the sender 
      socket.join(user.room)
      socket.emit('message', {user:'admin' , text: `${user.name}, welcome to the room ${user.room}`});
      // sends a message to others in the same room as sender 
      socket.broadcast.to(user.room).emit('message', {user:'admin' , text: `${user.name}, has joined!`});
      callback();
    })

    socket.on('sendMessage', (message, callback) => {
      const user = userService.getUser(socket.id);
      io.to(user.room).emit('message', {user: user.name, text: message})
      callback();
    })
})

const routes = require('./routes/api');
app.use('/api', routes)


server.listen(port, () => {
    console.log(`Server is on port ${port}`);
});
