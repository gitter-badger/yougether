var http  = require('../index.js').http,
io        = require('socket.io')(http),
 _        = require('underscore'),
utils     = require('../lib/utils.js'),
hotel     = require('../lib/hotel.js')(io.sockets.adapter)


io.on('connection', function(socket) {
 
  socket.on('create room', function(url) {
    //#todo: verify url
    //if url is not valid:
    //socket.emit('create room res', null) return
 
    //if url is valid:
    var roomID = utils.generateID()
    socket.emit('create room res', roomID)
    rooms.addRoom(roomID, url)
  })


  socket.on('join room', function(roomID) {
    //if room exists is verified in server.js when user accesses page
    socket.join(roomID)
    io.sockets.adapter.rooms[roomID].push({url: 'www.lol.pt'})
  })


  socket.on('disconnect', function() {
    //when user disconnects, if room is empty, remove it!
    console.log(socket.adapter.rooms)
    //if room empty
    //remove from io.sockets.adapter.rooms
    //remove from urls
  })


  socket.on('protocol', function(msg) {
    //do lots of things
  })

  socket.on('info', function() {
    console.log(io.sockets.adapter)
    console.log(hotel.listRooms())
  })

})


//debug
function infoSock(socket) {
  console.log("client id: "+socket.id)
  console.log("rooms: "+socket.rooms) 
  console.log('general state')
  console.log(io.sockets.adapter)
  console.log("--")

}


exports.io = io
