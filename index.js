var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

/*
V1
- support and sync play and pause
- syncs when paused

*/
io.on('connection', function(sock) {
	var instruction = 0

	console.log('user connected ' +sock)

	sock.on('paused', function(data) {
		data.instruction = instruction
		sock.broadcast.emit(data.action, data);
		console.log('broadcasting '+ data.action + ' at '+data.time)
	})

	sock.on('playing', function(data) {
		data.instruction = instruction
		sock.broadcast.emit(data.action, data);
		console.log('broadcasting '+ data.action + ' at '+data.time)
	})

})

app.use('/static', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendfile('public/index.html')
})

http.listen(3000, function() {
	console.log('listening on port 3000')
})