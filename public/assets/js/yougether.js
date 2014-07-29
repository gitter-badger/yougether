var socket = io()
var states = ['end','play','pause','buffer','cue']; //+ -1 = unstarted

function initPlayer(videoUrl) {
  currentVideoID = videoUrl.split('?v=')[1]
  var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '300',
		width: '600',
		videoId: currentVideoID,
		events: {
			'onStateChange': onPlayerStateChange
		}
	})
}


function onPlayerStateChange(event) {
  var state = states[event.data].toUpperCase()
  if(state == 'BUFFER') {state = 'PAUSE'}
  socket.emit('state', state, roomID, player.getCurrentTime())
}


/*
 * protocol
 *
 */

socket.on('state', function(state, time) {
  if(state == 'PLAY') {
    player.playVideo()
  } 
  else if(state == 'PAUSE') {
    player.seekTo(time)
    player.pauseVideo()
  }
  else if(state == 'STOP') {
    player.stopVide()
  }
})


/*
 * chat
 *
 */

function chat(msg) {
  console.log(msg)
  socket.emit('chat', roomID, user, msg)
  var div = document.getElementById('chat')
  div.innerHTML = div.innerHTML +
    user+': '+msg+'<br>'
}

socket.on('chat', function(user, msg){
  var div = document.getElementById('chat')
  div.innerHTML = div.innerHTML +
    user+': '+msg+'<br>'  
})



/*
 * operational
 *
 */

socket.on('create room res', function(res) {
	var div = document.getElementById('operationalDiv');
	if (res) {
  	var roomURL = "http://localhost:3000/watch/"+res
	  div.innerHTML = div.innerHTML + 
		'<a href='+roomURL+' target ="_blank">Room with id '+res+'</a> <br>'
  } else {
		div.innerHTML = div.innerHTML + 'URL invalid. Try again!' + '<br>'
    return
	}
})

socket.on('join room res', function(data) {
	if (data.err) alert('err')
	var div = document.getElementById('operationalDiv');
	div.innerHTML = div.innerHTML + data.res;
})
