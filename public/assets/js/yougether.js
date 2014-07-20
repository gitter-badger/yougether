var socket = io()

var player;
var states = ['end','play','pause','buffer','video cue']; //+ -1 = unstarted

var currentState = 'starting';
var roomID;
var user;


function initPlayer(videoID) {
	//loads youtube iframe async
	currentVideoID = videoID
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '480',
		width: '853',
		videoId: currentVideoID,
		events: {
			'onStateChange': onPlayerStateChange
		}
	})
}


//player actions
function onPlayerStateChange(event) {
	console.log(states[event.data].toUpperCase())

	//state buffering
	if(states[event.data] == 'buffer' && currentState == 'starting') {
		data = {'action': states[event.data],
			 	'time': player.getCurrentTime()
			 }
		console.log('emits buffering...')
		currentState = 'waiting for users'
		socket.emit('buffering', data)
	}

	//state waiting for users
	if(currentState == 'waiting for users' && states[event.data] == 'play') {
		player.pauseVideo()
		console.log('waiting for users...')
		//disable commands, while syncing (player.controls(0))
		//show div on top of iframe with 'syncing....'
		socket.emit('waiting', {'user': user, 'roomID': roomID})
	}

	//state running
	if(states[event.data] == 'play' || states[event.data] == 'pause') {
		data = {'action': states[event.data],
			 	'time': player.getCurrentTime()
			 }
		console.log('emits '+states[event.data])
		currentState = states[event.data]
		socket.emit(states[event.data], data)
	}
}


/*
 * Protocol
 *
 */

socket.on('play', function(data) {
	if (currentState != data.action) player.playVideo()
})

socket.on('pause', function(data) {
	if (currentState != data.action) {
		player.pauseVideo()
		player.seekTo(data.time, true)
	}
})

socket.on('ready', function(data) {
	console.log('everyone\'s ready!')
	currentState = 'play'
	player.playVideo()
})


/*
 * Operational
 *
 */

socket.on('create room res', function(res) {
	var div = document.getElementById('operationalDiv');
	if (res == 'null') {
		div.innerHTML = div.innerHTML + 'URL invalid. Try again!' + '<br>'
    return
	}
	var roomURL = "http://localhost:3000/watch/"+res
	div.innerHTML = div.innerHTML + 
		'<a href='+roomURL+' target ="_blank">Room with id '+res+'</a> <br>'
})


socket.on('join room res', function(data) {
	if (data.err) alert('err')
	var msg = data.res

	var div = document.getElementById('operationalDiv');
	div.innerHTML = div.innerHTML + msg;
})


function createRoomIO(url) {
	socket.emit('create room', url)
}
