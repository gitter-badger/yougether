var test  = require('tape'),
_         = require('underscore'),
rooms     = require('../server/warehouse/room_manager.js')

var roomID_1 = 'room1'
var roomID_2 = 'room2'
var roomID_3 = 'room3'
var url_1 = 'google.com'
var url_2 = 'youtube.com'


test('add remove rooms', function(t) {
  
  rooms.newRoom(roomID_1, url_1, function() {
    rooms.getRoom(roomID_1, function(res) {
      if(res) {
        t.equal(res['users'][0], roomID_1, 'user added')
        t.equal(res['currURL'], url_1, 'url added')
      
        //remove user & room
        rooms.removeUser(roomID_1, roomID_1, function(res) {
          if(res) t.fail('empty room was no deleted') 
        })        

     } else t.fail('room was not created')
    })
  })  
  

  t.end()
})
