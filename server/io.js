var http = require('../index.js').http
var io = require('socket.io')(http)
var _ = require('underscore')

io.on('connection', function(socket) {
  console.log("someone is connected")
  console.log("current rooms: ")
  console.log(io.sockets.adapter.rooms)
  
  socket.on('join room', function(data) {
    console.log("user entered in room "+data)
    var adapter = io.sockets.adapter
    console.log(adapter)
  })

  //receive and broadcast msg from and to room
  socket.on('msg room', function(room) {
    console.log("msg to room")
    socket.to(room).emit('msg room', room)
  })


})

exports.io = io
