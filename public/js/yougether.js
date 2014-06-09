//loads youtube iframe async
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
states = ['ended','playing','paused','buffering','video cued'] //+ -1 = unstarted
other = false

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
	if(other==false) {
		socket.emit(states[event.data], states[event.data])
	} else {
		other = false
	}
}


//inbound socket
socket.on('playing', function() {
	other = true
	player.playVideo()
})

socket.on('paused', function() {
	other = true
	player.pauseVideo()
})