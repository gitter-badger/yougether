var socket = io()

var player;
states = ['ended','playing','paused','buffering','video cued']; //+ -1 = unstarted
var user = Math.random()

function initPlayer() {
	//loads youtube iframe async
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
	videoID = document.getElementById("videoID").innerHTML
	console.log('www.youtube.com/'+videoID)
	player = new YT.Player('player', {
		height: '300',
		width: '300',
		videoId: 'www.youtube.com/'+videoID,
		events: {
			'onStateChange': onPlayerStateChange
		}
	})
}

//player actions
function onPlayerStateChange(event) {
	socket.emit(states[event.data], 
		{'action': states[event.data],
		 'time': player.getCurrentTime(),
		 'user': user
	})
}



/*
 *  outbound socks
 *
 */

//operational
function createRoomIO(url) {
	console.log('requesting new room with '+url)
	socket.emit('create room', url)
}


/*
  inbound socks

*/

//operational
socket.on('create room res', function(data) {
	var msg	
	if (isErr(data)) msg = data
	else msg = "http://localhost:3000/watch/"+data

	var div = document.getElementById('operationalDiv');
	div.innerHTML = div.innerHTML + msg + '<br>';
})

socket.on('enter room res', function(data) {
	if (data.err) alert('err')
	var msg = data.res

	var div = document.getElementById('operationalDiv');
	div.innerHTML = div.innerHTML + msg;
})




//player
socket.on('playing', function(data) {
	console.log('received playing //'+' me: '+user+' other: '+data.user)
	if(data.user != user) {
		player.playVideo()
	}
})

socket.on('paused', function(data) {
	console.log('received pause //'+'me: '+user+' other: '+data.user)
	if(data.user != user) {
		player.pauseVideo()
		player.seekTo(data.time, true)
	}
})


function isErr(msg) {
	return (msg.split(':')[0] == ['[err]'])
}