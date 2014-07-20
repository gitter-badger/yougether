var test	= require('tape'),
utils 		= require('../lib/utils.js')

//error recognizer from msgs
var errMsg = '[err]' 
function trim(msg) {
	return msg.split(':')[0]
}
test('url validity', function(t) {
	var wrong1 = 'asdasd'
	var wrong2 = 'www.youtube.com/'
	var wrong3 = 'www.youtube.com'
	var wrong4 = 'www.youtube.com/watch?v=2XH5_qafR8k'.toUpperCase()
	var corr1 = 'youtube.com/watch?v=2XH5_qafR8k'
	var corr2 = 'www.youtube.com/watch?v=2XH5_qafR8k'
	var corr3 = 'http://www.youtube.com/watch?v=2XH5_qafR8k'
	var corr4 = 'www.YOUTUBE.COM/watch?v=2XH5_qafR8k'


	utils.isValidUrl(wrong1, function(msg){
		t.equal(trim(msg), errMsg, 'wrong1 should not pass')
	})
	utils.isValidUrl(wrong2, function(msg){
		t.equal(trim(msg), errMsg, 'wrong2 should not pass')
	})
	utils.isValidUrl(wrong3, function(msg){
		t.equal(trim(msg), errMsg, 'wrong3 should not pass')
	})
	utils.isValidUrl(wrong4, function(msg){
		t.equal(trim(msg), errMsg, 'wrong4 should not pass')
	})

	utils.isValidUrl(corr1, function(msg){
		t.equal(msg, null, 'corr1 should pass')
	})
	utils.isValidUrl(corr2, function(msg){
		t.equal(msg, null, 'corr2 should pass')
	})
	utils.isValidUrl(corr3, function(msg){
		t.equal(msg, null, 'corr3 should pass')
	})
	utils.isValidUrl(corr4, function(msg){
		t.equal(msg, null, 'corr4 should pass')
	})
	t.end()
})
