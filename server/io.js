var http = require('../index.js').http
var io = require('socket.io')(http)
var _ = require('underscore')

io.on('connection', function(socket) {
  
  var msg = "this is a msg"
 
  infoSock(socket)
 
  socket.on('join room', function(roomName) {
    console.log("user joined room")
    socket.join(roomName, function() {
      infoSock(socket)
      console.log(socket.adapter)
    }) 
  })


  socket.on('leave room', function(roomName) {
    console.log("user left the room")
    socket.leave(roomName, function() {
      infoSock(socket)
      console.log(socket.adapter)
    })
  })


  socket.on('msg all', function() {
    infoSock(socket)
    console.log("emitting msg all")
    io.emit('msg', msg)
  })

  socket.on('msg room', function(room) {
    infoSock(socket)
    console.log("emitting msg room")
    io.to(room).emit('msg', msg)
  })
})




function infoSock(socket) {
  console.log("client id: "+socket.id)
  console.log("rooms: "+socket.rooms) 
  console.log("--")
}

exports.io = io
