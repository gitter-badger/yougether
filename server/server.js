var express	= require('express'),
app		 	    = express(),
_ 			    = require('underscore'),
utils		    = require('../lib/utils.js'),
warehouse   = require('./warehouse')


exports.express = express
exports.endpoint = app

var MAX_USR_ROOM = 3


app.get('/', function(req, res) {
  res.sendfile('public/index.html')
})

app.get('/watch/:roomID', function(req, res){
	var roomID = req.params.roomID

  warehouse.getRoom(roomID, function(res) {
    if(res) {
      if(res.users.length == MAX_USR_ROOM) {
        res.render('room_err',{msg:'the room is full'})
        return   
      } else {
        var userName = 'user'+Math.round(Math.random()*(50-0))
        res.render('room', {
          userName: userName,
          roomID: roomID,
          videoUrl: res.currUrl
        })
        return  
      }
    } else {
      res.render('room_err', {msg:'room doesnt exist'})
    }
  })
})


