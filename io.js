var http = require('./index.js').http
var io = require('socket.io')(http)
var _ = require('underscore')
var rooms = require('./rooms.js')

io.on('connection', function(socket) {

	/*
	 * Operational
	 *
	 */
	socket.on('create room', function(url) {
		console.log('event: create room')
		rooms.createRoom(url, function(err) {
			socket.emit('create room res', err)
		})
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
