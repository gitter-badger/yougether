var test	= require('tape'),
rooms 		= require('../rooms.js')

//error recognizer from msgs
var errMsg = '[err]' 
function trim(msg) {
	return msg.split(':')[0]
}

test('createRoom, roomExists and removeRoom', function(t) {
	var correctRoomID;
	var urlWrong1 = 'www.youtube.com/'
	var urlWrong2 = 'www.youtube.com/fssfd'
	var urlCorrect = 'www.youtube.com/watch?v=2XH5_qafR8k'

	rooms.createRoom(urlWrong1, function(roomID) {
		t.equal(trim(roomID), errMsg, 'urlWrong1 should not pass')
	})

	rooms.createRoom(urlWrong2, function(roomID) {
		t.equal(trim(roomID), errMsg, 'urlWrong2 should not pass')
		
		rooms.removeRoom(urlWrong2, function(err) {
			t.equal(trim(err), errMsg, 'room does not exists, error should be thrown')
		})
	})

	rooms.createRoom(urlCorrect, function(roomID) {
		t.notEqual(trim(roomID), errMsg, 'urlCorrect should pass')
		
		rooms.roomExists(roomID, function(bool) {
			t.equal(bool, true, 'room should exist')
		})
	
		rooms.removeRoom(roomID, function(err) {
			t.equal(trim(err), errMsg, 'room existed before, error should be thrown')
	
			rooms.removeRoom(roomID, function(err) {
				t.equal(trim(err), errMsg, 'room didnt exist when called, error should not be thrown')
			})
		})
	})

	t.end()
})



test('getInfoRoom', function(t) {
	var url = 'www.youtube.com/watch?v=2XH5_qafR8k'
	var randomID = 'qwe'

	rooms.getInfoRoom(randomID, function(data) {
		t.equal(data, null, 'data should be null')
	})

	rooms.createRoom(url, function(roomID) {
		rooms.getInfoRoom(roomID, function(data) {
			t.notEqual(data, null, 'data should not be null')

			rooms.removeRoom(roomID, function() {
				rooms.getInfoRoom(roomID, function(data) {
					t.notEqual(data, null, 'data should be null')
				})	
			})		
		})
	})
	t.end()
})


test('addUserToRoom', function(t) {
	var url = 'www.youtube.com/watch?v=2XH5_qafR8k'

	rooms.addUserToRoom('randomID', 'user1', function(err){
		t.notEqual(err, null, 'room does not exist, err should not be null')
	})

	rooms.createRoom(url, function(roomID) {
		rooms.addUserToRoom(roomID, 'user1', function(err){
			t.equal(err, null, 'room exists, error should be null')
	
			rooms.addUserToRoom(roomID, 'user1', function(err){
				t.notEqual(err, null, 'user already exists, error should not be null')
			})
		})	
	})
	t.end()
})


test('removeUserRoom', function(t){
	var url = 'www.youtube.com/watch?v=2XH5_qafR8k'

	rooms.removeUserRoom('randomID', 'user1', function(msg) {
		t.equal(trim(msg), errMsg, 'room does not exist, err should not be null')
	})

	rooms.createRoom(url, function(roomID){
		rooms.addUserToRoom(roomID, 'user1', function(msg){
			t.equal(msg, null, 'room exists and user does not. error should be null')
			
			rooms.removeUserRoom(roomID, 'user1', function(msg) {
				t.equal(trim(msg), errMsg, 'room and user exists, err should not be null')

				rooms.removeUserRoom(roomID, 'user1', function(msg) {
				t.equal(trim(msg), errMsg, 'user does not exist anymore, err should be null')
				})
			})
		})
	})
	t.end()
})


/*
test('changeVideoIDRoom', function(t) {
	var url = 'www.youtube.com/watch?v=2XH5_qafR8k'
	var url2 = 'www.youtube.com/watch?v=koJIscC8sAE'
	var wrongUrl = 'dadda'

	rooms.changeVideoIDRoom('randomID', url, function(msg) {
		t.equal(trim(msg), errMsg, 'room does exist, err should not be null')
	})

	rooms.createRoom(url, function(roomID) {
		rooms.changeVideoIDRoom(roomID, wrongUrl, function(err) {
			t.equal(err, null, 'wrong url, err should not be null')
		})

		rooms.changeVideoIDRoom(roomID, url2, function(err) {
			t.notEqual(err, null, 'err should be null')
			
			rooms.getInfoRoom(roomID, function(data) {
				t.equal(data.currentUrl, url2, 'urls should be the same')
			})
		})		
	})
	t.end()
})
*/