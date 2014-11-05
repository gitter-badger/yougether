var http          = require('../index.js').http,
io                = require('socket.io')(http),
 _                = require('underscore'),
utils             = require('../lib/utils.js'),
youtubeValidator  = require('youtube-validator'),
warehouse         = require('./warehouse')


exports.io  = io

io.on('connection', function(socket) {
  socket.on('create room', function(url) {
    youtubeValidator.validateUrl(url, function(res, err) {
      if(err) {
        socket.emit('create room res', null) 
        return
      } 
      var roomID = socket.id //room takes the id of its creator     
      warehouse.initRoom(roomID, url, function(res) {
        if(res) socket.emit('create room res', socket.id)
      })
    })
  })

  socket.on('join room', function(roomID) {
    console.log(socket.id+' joining '+ roomID)
    socket.join(roomID)
    warehouse.joinRoom(roomID, socket.id, function(res){
      if(res.time != 0) {
       socket.emit('start on', res.time) 
      }
    })
  })

  socket.on('leave room', function(roomID) {
    warehouse.leaveRoom(roomID, function(res) {
      socket.leave(roomID) 
      if(res == 0) console.log('room empty and destroyed'))
    })
  })

  socket.on('disconnect', function() {
    warehouse.userDisconnect(socket.id, function(res) {
      if(res == 0) {
        console.log('user '+socket.id+' disconnected and room empty')
      } else {
        console.log('user '+socket.id+' disconnected')
      }
    })
  })
 
 /*
  * protocol
  *
  */
 
  socket.on('state', function(state, roomID, time) {
    warehouse.updateState(roomID, state, function(curr_state) {
      if(curr_state != state) { 
        console.log(roomID + ': '+state) 
        socket.in(roomID).emit('state', state, time)
      }      
    })
  }) 

 /*
  * chat
  *
  */
  
  socket.on('chat', function(roomID, user, msg) {
    socket.in(roomID).emit('chat', user, msg)  
  })    

})



