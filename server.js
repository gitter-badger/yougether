var express = require('express')
var app = express()
var _ = require('underscore')
var rooms = require('./rooms.js')


app.use('/static', express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.sendfile('public/index-io.html')
})


app.get('/watch/:roomID', function(req, res){
	var roomID = req.params.roomID

	rooms.roomExists(roomID, function(err) {
		if(err) {
			res.render('room_err '+err)		
		}
	})

	rooms.addUserToRoom(roomID, userName, function(err) {
		if(err) {
			res.render('room_err '+err)	
		}
	})

	res.locals = {'roomID': roomID} //+ data
	res.render('room')
})



exports.endpoint = app