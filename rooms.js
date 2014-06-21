var _ 	= 	require('underscore'),
utils	=	require('./utils.js')

var db = {}

/*

http://yougether.io/watch/<roomID>

'roomID': {
	'users': [string]
	'currentVideoID': string,
	'history': [string]
	}
*/



//---- sandbox

//----

function createRoom(url, clbk) {
	var roomID = null

	utils.isValidUrl(url, function(err) {
		if(err) { 
			clbk(err)
		 } else {
			var roomID = generateRoomID()
			db[roomID] = {
				'users': [],
				'currentVideoID': _.last(url.split('=')),
				'history': []
			}		
			clbk(roomID)
		}
	})
}

function removeRoom(roomID, clbk) {
	roomExists(roomExists, function(exists){
		if(exists) {
			delete db.roomID
			clbk(null)
		} else {
			clbk('[err]:  room does not exist')
		}
	})
}

function roomExists(roomID, clbk) {
	clbk(_.has(db, roomID))
}


function addUserToRoom(roomID, userName, clbk) {
	roomExists(roomID, function(ok) {
		if(ok) {
			db[roomID].users.push(userName)
		} else {
			clbk('[err]: room does not exist')
		}
	})
}

function removeUserRoom(roomID, userName, clbk) {
	roomExists(roomID, function(exists) {
		if(exists) {
			var roomObject = db[roomID] 
			var userEntry = roomObject.indexOf(userName)
			if(userEntry == -1) {
				clbk('[err]: user is not in the room')
				return	
			} else {
				roomObject.splice(userEntry, 1)
			}
		} else {
			clbk('[err]: room does not exist')
		}
	})


}

//not tested
function changeVideoIDRoom(roomID, url, clbk) {
	roomExists(roomID, function(exists) {
		if(exists) {
			utils.isValidUrl(url, function(err) {
				if(err == null) {
					var roomObject = db[roomID] 
					var currID = roomObject.currentVideoID
					roomObject.history.push(currID)
					roomObject.currentVideoID = url
					clbk(null)
				} else { clbk(err) }
			})
		} else {
			clbk('[err]: room does not exist')
		}
	})
}

function getInfoRoom(roomID, clbk) {
	if(typeof db[roomID] == 'undefined') {
		clbk(null)
	} else {
		clbk(db[roomID])
	}
}


function getAll() {
	return db
}

/*
	private and auxiliar fuctions
*/

function generateRoomID() {
	return Math.random().toString(36).slice(12)
}


exports.createRoom = createRoom
exports.roomExists = roomExists
exports.removeRoom = removeRoom
exports.addUserToRoom = addUserToRoom
exports.removeUserRoom = removeUserRoom
exports.changeVideoIDRoom = changeVideoIDRoom
exports.getInfoRoom = getInfoRoom
exports.getAll = getAll