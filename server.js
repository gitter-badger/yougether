var express = require('express')
var app = express()
var _ = require('underscore')

var rooms = {}

app.use('/static', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendfile('public/index-io.html')
})


app.get('/create_room/:roomName', function(req, res) {
	//check if room exists
	var roomName = req.params.roomName

	//create room
	if (_.indexOf(rooms, roomName) == -1) {
		rooms[roomName] = {'nrUsers': 0}
		res.locals = { 'roomURL': 'http://localhost:3000/room/'+roomName }
	} else {
		res.locals = { 
		'err': 'room already exists',
		'roomURL': 'http://localhost:3000/room/'+roomName, 
		}
	}

	res.render('new_room')
})


app.get('/room/:roomName', function(req, res){
	//check if room exist
	var roomName = req.params.roomName

	//add user to the room
	if (rooms[roomName].nrUsers < 3) {
		rooms[roomName].nrUsers=rooms[roomName].nrUsers+1
		res.locals = { 
		'roomName': roomName,
		'nrUsers': rooms[roomName].nrUsers 
		}
		res.render('room')
	} else {
		res.locals = { 
		'roomName': roomName,
		'err': 'too many uusers!!' 
	    }
	    res.render('room_err')
    }

})


//API
app.get('/api/suggestions', function(res, req) {
	console.log('API send suggestions')
})



exports.endpoint = app