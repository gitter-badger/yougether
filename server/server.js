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
	var userName = 'user'+Math.round(Math.random()*(50-0))
	res.render('room')	
})


exports.express = express
exports.endpoint = app
