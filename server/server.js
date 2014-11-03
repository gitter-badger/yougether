var express	= require('express'),
app		 	    = express(),
_ 			    = require('underscore'),
rooms       = require('./io.js'),
utils		    = require('../lib/utils.js')


exports.express = express
exports.endpoint = app

app.get('/', function(req, res) {
  res.sendfile('public/index.html')
})

app.get('/watch/:roomID', function(req, res){
	var roomID = req.params.roomID
  
  rooms.existRoom(roomID, function(exists) {
    if(exists) {
      rooms.nrUsers(roomID, function(nrUsers) {
        if (nrUsers>5) {
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


