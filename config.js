var server = require('./server.js').endpoint
var hbs = require('hbs')

//handlebars config
server.set('view engine', 'hbs');
server.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
