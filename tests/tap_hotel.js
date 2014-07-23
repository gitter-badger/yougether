var test = require('tape'),
io       = require('socket.io-client'),
server   = require('../index.js').http


client = io.connect('http://localhost:3000')

test('all', function(t) {
  
  //do not work (nor t.end)  
  t.plan(1)
  
  client.on('connect', function() {
    
    client.emit('join room', 'room1', function() {})
    //check result:
    client.emit('test interface')
    client.on('test res', function(rooms) {
      t.notEqual(rooms, [], 'rooms should not be empty')
    })



  })
})


