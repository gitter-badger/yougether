var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

/*
V1
support and sync play and pause
chat & log
*/
io.on('connection', function(sock) {

	console.log('user connected')

	sock.on('paused', function(data) {
		sock.broadcast.emit(data, data);
		console.log('broadcasting '+data)
	})

	sock.on('playing', function(data) {
		sock.broadcast.emit(data, data);
		console.log('broadcasting '+data)
	})

})

app.use('/static', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendfile('public/index.html')
})

http.listen(3000, function() {
	console.log('listening on port 3000')
})