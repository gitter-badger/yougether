var socket = io()

//loads youtube iframe async
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
states = ['ended','playing','paused','buffering','video cued']; //+ -1 = unstarted
var user = Math.random()

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '300',
		width: '300',
		videoId: 'M7lc1UVf-VE',
		events: {
			'onStateChange': onPlayerStateChange
		}
	})
}

//outbout socket
function onPlayerStateChange(event) {
	socket.emit(states[event.data], 
		{'action': states[event.data],
		 'time': player.getCurrentTime(),
		 'user': user
	})
}



socket.emit('join', 
	{ 'username': user,
	  'room': 'room1'
	})


//inbound socket
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

socket.on('update', function(data) {
	alert(data)
})