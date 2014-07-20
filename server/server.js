var express	= require('express'),
app		 	= express(),
_ 			= require('underscore'),
utils		= require('../lib/utils.js')

app.get('/', function(req, res) {
  res.sendfile('public/index.html')
})

app.get('/test', function(req, res) {
    res.sendfile('public/test.html')
    
})

app.get('/watch/:roomID', function(req, res){
	var roomID = req.params.roomID
  //check if room exists
  //if not:
  //res.render('room_error')

  //if exists:
  var userName = 'user'+Math.round(Math.random()*(50-0))
  var videoID = 'fetch videoID'
  //send userName, roomID and videoID to be rendered by handlebars  
  res.render('room')	
})


exports.express = express
exports.endpoint = app
