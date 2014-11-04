var _ = require('underscore')


//rooms = { room_id: {users:[socketID_1, socketID_2...], currUrl="" },..}
var rooms = {}

var newRoom = function(roomID, url, cb) {
  this.rooms[roomID] = {'users':[roomID],'currURL':url}
  cb()
}

var getRoom = function(roomID, cb) {
  cb(this.rooms[roomID])
}

var updateRoom = function(roomID, opts) {
  _.keys(opts).forEach(function(k) {
    this.rooms[roomID][k] = opts[k]
  })
}

var addUser = function(roomID, user) {
  this.rooms[roomID][users].push(user)
}

var removeUser = function(roomID, user, cb) {
  var i = this.rooms[roomID]['users'].indexOf(user)
  if(i > -1) { 
    this.rooms[roomID]['users'].splice(i, 1)
    if(this.rooms[roomID]['users'].length == 0) {
      delete rooms[roomID]
    }
  }
  cb(this.rooms[roomID])
}


exports.rooms       = rooms
exports.newRoom     = newRoom
exports.getRoom     = getRoom
exports.updateRoom  = updateRoom
exports.addUser     = addUser
exports.removeUser  = removeUser

