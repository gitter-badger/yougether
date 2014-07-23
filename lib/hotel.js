_ = require('underscore')


function Hotel(adpt) {
  this.adapter = adpt
}

Hotel.prototype.addPropertyToRoom = function(roomID, obj){
  this.adapter.rooms.roomID.push(obj)
}

Hotel.prototype.listRooms = function(clbk) {
  clbk(this.adapter.rooms)
}

Hotel.prototype.getUsersRoom = function(roomID, clbk) {
  clbk(this.adapter.rooms[roomID])
}

Hotel.prototype.delEmptyRoom = function(roomID) {
  if(_.isEmpty(this.adapter.rooms[roomID])){
    delete this.adapter.rooms[roomID] 
  }
}

Hotel.prototype.getRoomsUser(user, clbk) {
  clbk(this.adapter.sids[user])
}

Hotel.prototype.roomExists = function(roomID, clbk) {
  clbk((typeof this.adapter.rooms[roomID] == 'undefined') ? false : true)
}


module.exports = Hotel
