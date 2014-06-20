var express	= require('express'),
app		 	= express(),
_ 			= require('underscore'),
rooms 		= require('./rooms.js'),
utils		= require('./utils.js')


app.use('/static', express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.sendfile('public/index.html')
})


app.get('/watch/:roomID', function(req, res){
	var roomID = req.params.roomID

	rooms.roomExists(roomID, function(exists) {
		if (!exists) {
			res.locals = {'err': 'room does not exist'}
			res.render('room_err')
		} else {
			//not adding a new user yet	
			rooms.getInfoRoom(roomID, function(data) {
				res.locals = {
					'roomID': roomID,
					'videoID': data.currentVideoID
				}
				res.render('room')	
			})	
		}
	})
})

exports.endpoint = app