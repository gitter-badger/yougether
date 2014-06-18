var express	= require('express'),
app		 	= express(),
_ 			= require('underscore'),
rooms 		= require('./rooms.js'),
utils		= require('./utils.js')


app.use('/static', express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.sendfile('public/index-io.html')
})


app.get('/watch/:roomID', function(req, res){
	var roomID = req.params.roomID

	rooms.roomExists(roomID, function(exists) {
		if (!exists) {
			res.locals = {'err': 'room does not exist'}
			res.render('room_err')
			return
		}
		
		var userName = 'randomUser'
		rooms.addUserToRoom(roomID, userName, function(msg) {
			if(utils.isErr(msg)) {
				res.locals = {'err': msg}
				res.render('room_err')
				return
			}
				res.locals = {'roomID': roomID} //+ data
				res.render('room')
			})
		})
	})




exports.endpoint = app