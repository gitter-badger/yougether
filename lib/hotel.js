/*
 * constuctor
 * 
 * @param {Adapter} adapter
 *
 */


function listRooms() {}

function getUsersRoom(roomID) {}

function delEmptyRoom(roomID) {}

module.exports = function(adapter){
  this.adapter = adapter
  console.log('hotel built')
  return this
}

module.exports = function listRooms() {
  return this.rooms
}
