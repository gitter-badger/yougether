var _ 	= 	require('underscore'),
http 	=	require('http')

/*
 check url validity:

http://youtube.com/<videoID>
www.youtube.com/<videoID>
youtube.com/<videoID>
- lower and upper case
- if videoID is valid and exists
 */
function isValidUrl(url, clbk) {
	var videoID = '/'+_.last(url.split('/'))
	//support lowercase host
	var urlLowerCase = url.toLowerCase()
	var urlSpltLowerCase = urlLowerCase.split('/')

	if(_.contains(urlSpltLowerCase, 'youtube.com') || _.contains(urlSpltLowerCase, 'www.youtube.com')) {
		var begin = urlLowerCase.replace('youtube.com','').replace(videoID.toLowerCase(),'')
		if(!(begin== 'www.' || begin== 'http://www.' || begin== '')) {
			clbk('[err]:  invalid url. begin: '+begin)
			return
		}
	} else {
		clbk('[err]: invalid url')
		return
	}

	if(videoID=='' || videoID=='/') {
		clbk('[err]: invalid url')
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
			clbk(null)
		} else
		clbk('[err]:  [youtube] invalid url')

		req.on('error', function(e) {
			clbk('[err]:  '+e)
		})
	})
	req.shouldKeepAlive = false
	req.end()
}


exports.isValidUrl = isValidUrl