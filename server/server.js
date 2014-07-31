var express	= require('express'),
app		 	    = express(),
_ 			    = require('underscore'),
rooms       = require('./io.js'),
utils		    = require('../lib/utils.js')

app.get('/', function(req, res) {
  res.sendfile('public/index.html')
})

app.get('/test', function(req, res) {
    res.sendfile('public/test.html')
    
})

app.get('/watch/:roomID', function(req, res){
	var roomID = req.params.roomID
  
  rooms.existRoom(roomID, function(exists) {
    if(exists) {
      rooms.nrUsers(roomID, function(nrUsers) {
        if (nrUsers>2) {
          res.render('room_err',{msg:'the room is full'})
          return
        }
      })

      var userName = 'user'+Math.round(Math.random()*(50-0))
      rooms.getPropertiesRoom(roomID, function(props) {
        res.render('room', {
          userName: userName,
          roomID: roomID,
          videoUrl: props['currentUrl']
         })
      })
      return
    } else {
      res.render('room_err', {msg: 'the room does not exist'})
      }	
  })
})


exports.express = express
exports.endpoint = app
