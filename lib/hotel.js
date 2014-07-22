_ = require('underscore')


function Hotel(adpt) {
  this.adapter = adpt
}

Hotel.prototype.addPropertyToRoom = function(roomID, obj){
  this.adapter.rooms.roomID.push(obj)
}

Hotel.prototype.listRooms = function() {
  return this.adapter.rooms
}

Hotel.prototype.getUsersRoom = function(roomID) {}

Hotel.prototype.delEmptyRoom = function(roomID) {
  if(_.isEmpty(this.adapter.rooms[roomID])){
    delete this.adapter.rooms[roomID] 
  }
}

Hotel.prototype.roomExists = function(roomID) {
  return (typeof this.adapter.rooms[roomID] == 'undefined') ? false : true
}

module.exports = Hotel
