var _ 	= 	require('underscore'),
http 	=	require('http')

var db = {}

/*

http://yougether.io/watch/<roomID>

'roomID': {
	'users': [string]
	'currentVideoID': string,
	'history': [string]
	}
*/



//----

//----


function createRoom(url, clbk) {
	var roomID = null

	isValidUrl(url, function(err) {
		if(err) { 
			clbk(err)
		 } else {
			var roomID = generateRoomID()
			db[roomID] = {
				'users': [],
				'currentVideoID': _.last(url.split('/')),
				'history': []
			}		
			clbk(roomID)
		}
	})
}


function removeRoom(roomID, clbk) {
	var err = null
	console.log('createRoom')
	clbk(err)
}

function roomExists(roomID, clbk) {
	console.log('roomExists')
	clbk(true)
}


function addUserToRoom(roomID, userName, clbk) {
	console.log('addUserToRoom')
	var err = null
	clbk(err)
}

function removeUserRoom(roomID, userName, clbk) {
	console.log('removeUserRoom')
	var err = null
	clbk(err)
}

function changeUrlRoom(roomID, url, clbk) {
	console.log('changeUrlRoom')	
	var err = null
	clbk(err)
}

function getInfoRoom(roomID, clbk) {
	var roomInfo = {}
	console.log('get info room')
	clbk(roomInfo)
}





/*
	private and auxiliar fuctions
*/

function generateRoomID() {
	return Math.random().toString(36).slice(12)
}

/*
 check url validity:

http://youtube.com/<videoID>
www.youtube.com/<videoID>
youtube.com/<videoID>
- lower and upper case
- if videoID is valid and exists
 */
function isValidUrl(url, clbk) {
	url = url.toLowerCase()
	var urlSplt = url.split('/')
	var videoID = '/'+_.last(urlSplt)

	if(_.contains(urlSplt, 'youtube.com') || _.contains(urlSplt, 'www.youtube.com')) {
		var begin = url.replace('youtube.com','').replace(videoID,'')
		if(!(begin== 'www.' || begin== 'http://www.' || begin== '')) {
			clbk('invalid url')
			return
		}
	} else {
		clbk('invalid url')
		return
	}

	//check if youtube video exists
	var options = {
		method: 'HEAD',
		host: 'www.youtube.com',
		port: 80,
		path: videoID
	}
	var req = http.request(options, function(res) {
		if(res.statusCode=='200'){
			clbk(null)
		} else
		clbk('[youtube] invalid url')

		req.on('error', function(e) {
			clbk(e)
		})
	})
	req.shouldKeepAlive = false
	req.end()
}






exports.createRoom = createRoom
exports.roomExists = roomExists
exports.removeRoom = removeRoom
exports.addUserToRoom = addUserToRoom
exports.removeUserRoom = removeUserRoom
exports.changeUrlRoom = changeUrlRoom
exports.getInfoRoom = getInfoRoom