var rooms         = require('./room_manager.js')


var initRoom = function(roomID, url, cb) {
  rooms.newRoom(roomID, url, function(room) {
    cb(room)  
  }) 
}

var joinRoom = function(roomID, sock, cb) {
  rooms.addUser(roomID, sock.id, function(state) {
    cb({'res': state})
  })
}

var leaveRoom = function(roomID, userID, cb) {
  rooms.removeUser(roomID, userID, function() {
    cb()
  })
}

var roomExists = function(roomID, cb) {
  rooms.getRoom(roomID, function(res) {
    if(res) cb(res.users.length)
    else cb(res)
  })
}


var userDisconnect = function(user_socket, cb) {
  //this.leaveRoom(roomID, userID, cb)
  console.log('dont do anything.. yet')
}

var updateState = function(roomID, state, cb) {
  room.getRoom(roomID, function(res){
    if(res['state'] != state) {
      var opts = {'state': state}
      rooms.updateRoom(roomID, opts, function() {
        cb(state) 
      }) 
    } else cb(state)
  })
}

var startConsensus = function(socket, roomID, cb) {
  rooms.getRoom(roomID, function(res) {
    socket.consensus['nr_res'] = res['users'].length
    socket.consensus['times'] = []
    cb()
  })
}

var consensus = function(socket, res, cb) {
  if(socket.consensus['nr_res']-- == 1) {
    var time = Math.max.apply(Math, socket.consensus['times']);
    cb(state, time)    
  }
}

exports.initRoom        = initRoom
exports.joinRoom        = joinRoom
exports.leveRoom        = leaveRoom
exports.roomExists      = roomExists
exports.userDisconnect  = userDisconnect
//exports.currentState  = currentState
exports.startConsensus  = startConsensus
