var http = require('./index.js').http
var io = require('socket.io')(http)
var _ = require('underscore')
var rooms = require('./rooms.js')

io.on('connection', function(socket) {

	/*
	 * Operational
	 *
	 */

	//this action is passed along as REST (page changes from the client-side)
	socket.on('create room', function(data) {
		//TODO: verify url
		rooms.createRoom(url, function(url, err) {
			if (err) {
				socket.emit('update', err)
			} else {
				socket.emit('update', url)
			}
		})
	})

	socket.on('join', function(data) {
		//the verification comes from the express layer (need to verify again ?)

		socket.username = data.username
		socket.room = data.room
		socket.join('room')
		socket.emit('update', 'You are connected to '+data.room)
		socket.broadcast.to(data.room, data.username+' has connected to this room.')

		console.log('we got a join!')
	})

	socket.on('suggestions', function(data) {
		console.log('send suggestions back based on the room')
	})



	/*
	 * Controls
	 *
	 */
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



	/*
	 * Chat
	 *
	 */


})


exports.io = io
