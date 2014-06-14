var test = require('tape');
var rooms = require('../rooms.js')

test('createRoom, roomExists and removeRoom', function(t) {
	t.plan(3)

	var correctRoomID;
	var urlWrong1 = 'www.youtube.com/'
	var urlWrong2 = 'www.youtube.com/fssfd'
	var urlCorrect = 'www.youtube.com/watch?v=2XH5_qafR8k'

	rooms.createRoom(urlWrong1, function(roomID) {
		t.equal(null, roomID, 'urlWrong2 should not pass')
	})

	rooms.createRoom(urlWrong2, function(roomID) {
		t.equal(null, roomID, 'urlWrong2 should not pass')
		
		rooms.removeRoom(urlWrong2, function(err) {
			t.notEqual(err, null, 'room does not exists, error should not be null')
		})
	})

	rooms.createRoom(urlWrong1, function(roomID) {
		t.notEqual(null, roomID, 'urlCorrect should pass')
		rooms.roomExists(roomID, function(bool) {
			t.equal(bool, true, 'room should exist')
		})
	
		rooms.removeRoom(roomID, function(err) {
			t.equal(err, null, 'room existed before, error should be null')
	
			rooms.removeRoom(roomID, function(err) {
				t.notEqual(err, null, 'room didnt exist when called, error should not be null')
			})
		})
	})
})

test('getInfoRoom', function(t) {
	var url = 'www.youtube.com/watch?v=2XH5_qafR8k'
	var randomID = 'qwe'

	t.plan(2)

	rooms.getInfoRoom(randomID, function(data) {
		t.equal(data, null, 'data should be null')
	})

	rooms.createRoom(url, function(roomID) {
		rooms.getInfoRoom(roomID, function(data) {
			t.notEqual(data, null, 'data should not be null')
		
			rooms.removeRoom(roomID, function() {
				rooms.getInfoRoom(roomID, function(data) {
					t.equal(data, null, 'data should be null')
				})	
			})		
		})
	})
})

test('addUserToRoom', function(t) {
	t.plan(3)
	var url = 'www.youtube.com/watch?v=2XH5_qafR8k'

	rooms.addUserToRoom('randomID', 'user1', function(err){
		t.notEqual(err, null, 'room does not exist, err should not be null')
	})

	rooms.removeUserRoom('randomID', 'user1', function(err){
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
})

test('removeUserRoom', function(t){
	t.plan(2)
	var url = 'www.youtube.com/watch?v=2XH5_qafR8k'

	rooms.removeUserRoom('randomID', 'user1', function(err) {
		t.notEqual(err, null, 'room does not exist, err should not be null')
	})

	rooms.createRoom(url, function(roomID){
		rooms.addUserToRoom(roomID, 'user1', function(err){
			t.equal(null, err, 'room exists and user does not. error should be null')
			
			rooms.removeUserRoom(roomID, 'user1', function(err) {
				t.equal(null, err, 'room and user exists, err should not be null')

				rooms.removeUserRoom(roomID, 'user1', function(err) {
				t.notEqual(null, err, 'user does not exist anymore, err should be null')
				})
			})
		})
	})
})


test('changeUrlRoom', function(t) {
	t.plan(2)
	var url = 'www.youtube.com/watch?v=2XH5_qafR8k'
	var url2 = 'www.youtube.com/watch?v=koJIscC8sAE'
	var wrongUrl = 'dadda'

	rooms.changeUrlRoom('randomID', url, function(err) {
		t.equal(err, null, 'room does exist, err should not be null')
	})

	rooms.createRoom(url, function(roomID) {
		rooms.changeUrlRoom(roomID, wrongUrl, function(err) {
			t.equal(err, null, 'wrong url, err should not be null')
		})

		rooms.changeUrlRoom(roomID, url2, function(err) {
			t.notEqual(err, null, 'err should be null')
			
			rooms.getInfoRoom(roomID, function(data) {
				t.equal(data.currentUrl, url2, 'urls should be the same')
			})
		})		
	})
})