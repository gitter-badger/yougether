var http = require('./index.js').http
var io = require('socket.io')(http)
var _ = require('underscore')
var rooms = require('./rooms.js')

var roomsOperational = {}


io.on('connection', function(socket) {

	/*
	 * Operational
	 *
	 */
	socket.on('create room', function(url) {
		console.log('event: create room')
		rooms.createRoom(url, function(data) {
			roomsOperational[data] = {'nrUsersReady':0}
			socket.emit('create room res', data)
		})
	})

	//implement remove users room front eh io side


	/*
	 * Controls
	 *
	 */
	socket.on('pause', function(data) {
		socket.broadcast.emit(data.action, data);
		console.log('broadcasting '+ data.action + ' at '+data.time)
	})

	socket.on('play', function(data) {
		socket.broadcast.emit(data.action, data);
		console.log('broadcasting '+ data.action + ' at '+data.time)
	})

	socket.on('waiting', function(data) {
		roomsOperational[data.roomID]['nrUsersReady']+=1
		rooms.getInfoRoom(data.roomID, function(info) {
		if(roomsOperational[data.roomID]['nrUsersReady'] == info['users'].length) {
			console.log('emit READY!')
			socket.emit('ready')
		}
	})
})

	/*
	 * Chat
	 *
	 */


})


exports.io = io
