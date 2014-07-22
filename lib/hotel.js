//module.exports = Hotel

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

//(check how to do that automatically)
Hotel.prototype.delEmptyRoom = function(roomID) {
  if(this.adapter.rooms.roomID == []){
    delete this.adapter.rooms.roomID 
  }
}

Hotel.prototype.roomExists = function(roomID) {
  return (this.adapter.rooms.roomID == 'undefined') ? true : false
    
}

module.exports = Hotel
