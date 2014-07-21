var _   = require('underscore')

function setUrlRoom(adapter, roomID, url) {
  adapter.rooms[roomID].push({current_url: url})
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
