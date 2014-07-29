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
      res.render('room_err')
      }	
  })
})


exports.express = express
exports.endpoint = app
