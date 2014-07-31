var http          = require('../index.js').http,
io                = require('socket.io')(http),
 _                = require('underscore'),
utils             = require('../lib/utils.js'),
youtubeValidator  = require('youtube-validator'),
Hotel             = require('socket.io-hotel')

var hotel = new Hotel(io.sockets.adapter)

io.on('connection', function(socket) {

 /*
  * operational
  *
  */

   socket.on('create room', function(url) {
    youtubeValidator.validateUrl(url, function(res, err) {
      if(err) {
        socket.emit('create room res', null) 
        return
      } 
      var roomID = socket.id //room takes the id of its creator     
      socket.emit('create room res', socket.id)
      hotel.setPropertyRoom(roomID, 'currentUrl', url, function(){})
      hotel.setPropertyRoom(roomID, 'state', 'new', function(){})
    })
  })

  socket.on('join room', function(roomID) {
    console.log(socket.id+' joining '+ roomID)
    socket.join(roomID)

    //check if video has already started
    hotel.getPropertiesRoom(roomID, function(props) {
      if(props['state']!='new') {
        console.log('session has started, ask someone for sync')
     }
    })
  })
  socket.on('leave room', function(roomID) {
    socket.leave(roomID) 
  })
  socket.on('disconnect', function() {
    console.log('user '+socket.id+' disconnected')
  })
  socket.on('info', function() {
    hotel.listRooms(console.log)
  })

 /*
  * protocol
  *
  */
 
  socket.on('state', function(state, roomID, time) {
    hotel.getPropertiesRoom(roomID, function(props){
      if(props['state']!=state) {
        hotel.setPropertyRoom(roomID, 'state', state, function() {
          socket.in(roomID).emit('state', state, time)
        })
      }
    })
  }) 

 /*
  * chat
  *
  */
  
  socket.on('chat', function(roomID, user, msg) {
    socket.in(roomID).emit('chat', user, msg)  
})    



})


//expose if a given room exists or not
function existRoom(roomID, clbk) {
  hotel.listRooms(function(list) {
    clbk(_.has(list, roomID))
  })
}

function getPropertiesRoom(roomID, clbk) {
  hotel.getPropertiesRoom(roomID, function(props) {
    clbk(props)
  })
}

function nrUsers(roomID, clbk) {
  hotel.getUsersRoom(roomID, function(users){
    clbk(_.keys(users).length)
  })
}

exports.nrUsers           = nrUsers
exports.getPropertiesRoom = getPropertiesRoom,
exports.existRoom         = existRoom
exports.io                = io
