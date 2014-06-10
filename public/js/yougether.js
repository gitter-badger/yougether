//loads youtube iframe async
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
states = ['ended','playing','paused','buffering','video cued'] //+ -1 = unstarted
var instruction = 0

console.log(userID)

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
		 'time': player.getCurrentTime()
		})
}


//inbound socket
socket.on('playing', function(data) {
	player.playVideo()
})

socket.on('paused', function(data) {
		player.pauseVideo()
		player.seekTo(data.time, true)
})