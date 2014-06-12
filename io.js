var http = require('./index.js').http
var io = require('socket.io')(http)
var _ = require('underscore')

var maxUsers = 3

io.on('connection', function(socket) {

	var rooms = {}

	socket.on('join', function(data) {
		//check is room is available

		//if yes, join the room
		socket.username = data.username
		socket.room = data.room
		socket.join('room')
		socket.emit('update', 'You are connected to '+data.room)
		socket.broadcast.to(data.room, data.username+' has connected to this room.')

		console.log('we got a join!')
	})





	//controls
	socket.on('paused', function(data) {
		data.instruction = instruction
		socket.broadcast.emit(data.action, data);
		console.log('broadcasting '+ data.action + ' at '+data.time)
	})

	socket.on('playing', function(data) {
		data.instruction = instruction
		socket.broadcast.emit(data.action, data);
		console.log('broadcasting '+ data.action + ' at '+data.time)
	})

})


exports.io = io
