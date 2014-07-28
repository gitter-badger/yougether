var http          = require('../index.js').http,
io                = require('socket.io')(http),
 _                = require('underscore'),
utils             = require('../lib/utils.js'),
youtubeValidator  = require('youtube-validator'),
Hotel             = require('socket.io-hotel')

var hotel = new Hotel(io.sockets.adapter)

io.on('connection', function(socket) {
 
  socket.on('create room', function(url) {

    youtubeValidator.validateUrl(url, function(res, err) {
      if(err) {
        socket.emit('create room res', null) 
        return
      } 
      var roomID = socket.id //room takes the id of its creator     
      socket.emit('create room res', socket.id)
      hotel.setPropertyRoom(roomID, 'currentUrl', url, function(){})
    })
  })

  socket.on('join room', function(roomID) {
    console.log(socket.id+' joining '+ roomID)
    socket.join(roomID)
  })

  socket.on('leave room', function(roomID) {
    socket.leave(roomID) 
    hotel.delEmptyRoom(roomID) //if room is empty, delete it
  })

  socket.on('disconnect', function() {
    console.log('user '+socket.id+' disconnected')
    socket.rooms.forEach(function(room) {
        hotel.delEmptyRoom(room, console.log)
    })
  })

  socket.on('info', function() {
    hotel.listRooms(console.log)
    console.log(io.sockets.adapter)
  })
})


//expose if a given room exists or not
function existRoom(roomID, clbk) {
  hotel.listRooms(function(list) {
    clbk(_.has(list, roomID))
  })
}

function getPropertiesRoom(roomID) {
  hotel.getPropertiesRoom(roomID, function(props) {
    console.log(roomID+': '+props)
    return props
  })
}

exports.getPropertiesRoom = getPropertiesRoom,
exports.existRoom         = existRoom
exports.io                = io
