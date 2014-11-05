var rooms         = require('./room_manager.js')
ConsensusStrategy = require('./strategy.js'),
ConsensusManager  = require('consensus-manager'),


var str_opts = {}
var str = new ConsensusStrategy(opts)
var consensus = ConsensusManager(str)

var initRoom = function(roomID, url, cb) {
  rooms.newRoom(roomID, url, function() {
    cb()  
  }) 
}

var joinRoom = function(roomID, sock, cb) {
  var res = {'url':'', 'time':''}
  //if session has started, send url and time
  //if not, time ==  0
  cb(res)
}

var leaveRoom = function(roomID, userID, cb) {
  rooms.removeUser(roomID, userID, function() {
    cb()
  })
}

var userDisconnect = function(user_socket, cb) {
  this.leaveRoom(roomID, userID, cb)
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

exports.initRoom        = initRoom
exports.joinRoom        = joinRoom
exports.leveRoom        = leaveRoom
exports.userDisconnect  = userDisconnect
exports.currentState    = currentState
