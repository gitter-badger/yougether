var test = require('tape');
var rooms = require('../rooms.js')

test('createRoom, roomExists and removeRoom', function(t) {
	t.plan(8)

	var correctRoomID;
	var wrongRoomID;
	var urlWrong1 = 'www.youtube.com/'
	var urlWrong2 = 'www.youtube.com/fssfd'
	var urlCorrect = 'www.youtube.com/watch?v=2XH5_qafR8k'

	rooms.createRoom(urlWrong1, function(roomID) {
		t.equal(null, roomID, 'urlWrong2 should not pass')
	})

	rooms.createRoom(urlWrong2, function(roomID) {
		t.equal(null, roomID, 'urlWrong2 should not pass')
		wrongRoomID = roomID
	})

	rooms.createRoom(urlWrong1, function(roomID) {
		t.notEqual(null, roomID, 'urlCorrect should pass')
		correctRoomID = roomID
	})

	rooms.roomExists(correctRoomID, function(bool) {
		t.equal(bool, true, 'room should exist')
	})

	rooms.roomExists(correctRoomID, function(bool) {
		t.equal(bool, true, 'room should exist')
	})

	rooms.removeRoom(urlWrong2, function(err) {
		t.notEqual(err, null, 'room does not exists, error should not be null')
	})

	rooms.removeRoom(correctRoomID, function(err) {
		t.equal(err, null, 'room existed before, error should be null')
	})

	rooms.removeRoom(correctRoomID, function(err) {
		t.notEqual(err, null, 'room didnt exist when called, error should not be null')
	})
})