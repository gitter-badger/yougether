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
	clbk()
}

function roomExists(roomID, clbk) {
	console.log('roomExists')
	clbk()
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


exports.createRoom = createRoom
exports.roomExists = roomExists
exports.addUserToRoom = addUserToRoom
exports.removeUserRoom = removeUserRoom
exports.changeUrlRoom = changeUrlRoom