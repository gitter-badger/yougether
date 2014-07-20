var _ = require('underscore')

//rooms = {roomID1:'url1', roomID2:'url2', ...}
var rooms = {}

function addRoom(roomID, url) {
  rooms[roomID] = url
}

function getRoom(roomID) {
  return rooms.roomID
}

function delRoom(roomID) {
 delete rooms[roomID] 
}

function existsRoom(roomID) {
  return _.has(rooms, roomID)
}

exports.addRoom = addRoom
exports.getRoom = getRoom
exports.delRoom = delRoom
exports.existsRoom = existsRoom
