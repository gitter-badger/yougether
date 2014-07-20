var _ 	= 	require('underscore'),
http 	=	require('http')

/*
 check url validity:

http://youtube.com/<videoID>
www.youtube.com/<videoID>
youtube.com/<videoID>
- lower and upper case
- if videoID is valid and exists

  if url not valid, clbk(null)
  else, clbk(youtube videoID)

 */
function isValidUrl(url, clbk) {
	var videoID = '/'+_.last(url.split('/'))
	//support lowercase host
	var urlLowerCase = url.toLowerCase()
	var urlSpltLowerCase = urlLowerCase.split('/')

	if(_.contains(urlSpltLowerCase, 'youtube.com') 
    || _.contains(urlSpltLowerCase, 'www.youtube.com')) {
		var begin = urlLowerCase.replace('youtube.com','')
      .replace(videoID.toLowerCase(),'')
		if(!(begin== 'www.' || begin== 'http://www.' || begin== '')) {
			clbk(null)
			return
		}
	} else {
		clbk(null)
		return
	}

	if(videoID=='' || videoID=='/') {
		clbk(null)
		return		
	}

	//check if youtube video exists
	var options = {
		method: 'HEAD',
		host: 'www.youtube.com',
		port: 80,
		path: videoID
	}
	var req = http.request(options, function(res) {
		if(res.statusCode=='200'){
      //url ok
			clbk(videoID)
		} else
		clbk(null)

		req.on('error', function(e) {
			clbk(null)
		})
	})
	req.shouldKeepAlive = false
	req.end()
}


function generateID() {
  return Math.random().toString(36).substring(12)
}


exports.generateID = generateID
exports.isValidUrl = isValidUrl
