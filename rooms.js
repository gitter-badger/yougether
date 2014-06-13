var db = {}

/*

http://yougether.io/watch/<roomID>

'roomID': {
	'users': [string]
	'currentUrl': string,
	'history': [string]
	}
*/


function createRoom(url, clbk) {
	console.log('createRoom')
	roomID = null
	clbk(roomID)
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
	clbk()
}

function removeUserRoom(roomID, userName, clbk) {
	console.log('removeUserRoom')
	clbk()
}

function changeUrlRoom(roomID, url, clbk) {
	console.log('changeUrlRoom')	
	clbk()
}

function getInfoRoom(roomID, clbk) {
	var roomInfo = null
	console.log('get info room')
	clbk(roomInfo)
}

exports.createRoom = createRoom
exports.roomExists = roomExists
exports.removeRoom = removeRoom
exports.addUserToRoom = addUserToRoom
exports.removeUserRoom = removeUserRoom
exports.changeUrlRoom = changeUrlRoom
exports.getInfoRoom = getInfoRoom