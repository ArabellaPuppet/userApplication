// Module dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var morgan = require('morgan');
var routes = require('./routes');
//var user = require('./routes/user');
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/userApplication');
var bodyParser = require('body-parser');
var method_override = require('method-override');
var cookie_parser = require('cookie-parser');
var express_session = require('express-session');

//Set port number
var portnumber = 3000;

// Initialise Express
var app = express();
console.log("Express has been initialised");

// Compile function
function compile(str, path){
	return stylus(str)
	.set('filename', path)
	.set('compress', true)
	.use(nib())
	.import('nib');
}

// Set Views folder
app.set('views', __dirname + '/views'); //__dirname is the name of our directory

// Initialise Jade
app.set('view engine', 'jade');
console.log('Jade has been initialised');

// Stylus Middleware
app.use(morgan('dev')); //replaces your app.use(express.logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(method_override());
app.use(cookie_parser('mykey'));
app.use(express_session());
//app.use(app.router);
app.use(stylus.middleware({ 
	src: __dirname + '/stylus',
	dest: __dirname + '/public',
	compile: compile
}))

app.use(express.static(__dirname + '/public/'));

// Render the routes views
app.get('/', routes.index);
app.get('/userlist', routes.userlist(db));
app.post('/adduser', routes.adduser(db));

app.listen(portnumber);

console.log("Server is now running on a port " + portnumber);