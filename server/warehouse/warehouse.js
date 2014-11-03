var ConsensusManager  = require('consensus-manager'),
ConsensusStrategy     = require('./strategy.js'),


exports.initRoom        = initRoom
exports.joinRoom        = joinRoom
exports.leveRoom        = leaveRoom
exports.userDisconnect  = userDisconnect
exports.currentState    = currentState

/*
rooms = {
  room_id: 
    { users:[socketID_1, socketID_2...], 
      currUrl="" 
    },
  ....
  }

*/
var rooms = {}


var str_opts = {}
var str = new ConsensusStrategy(opts)
var consensus = ConsensusManager(str)


var initRoom = function(roomID, url, cb) {
  //if room is created, cb transports true
  cb(true) 
}

var joinRoom = function(roomID, sock, cb) {
  var res = {'url':'', 'time':''}
 //if session has started, send url and time
 //if not, time == 0
  cb(res)
}

var leaveRoom = function(roomID, cb) {
  var res = 'nr_users'
  //if room is empty after, leaving room destroy it
 cb(res) 
}

var userDisconnect = function(user_socket, cb) {
  var res = 'nr_users_after' 
  //if room is empty after, leaving room destroy it
  cb(res)
}

var currentState = function(roomID, state, cb) {
 //if roomID != state, change state 
 //else keep nothing happens

}


