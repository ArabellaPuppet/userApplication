// Module dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');

//Set port number
var portnumber = 3000;

// Initialise Express
var app = express();
console.log("Express has been initialised");

// Compile function - check this function online
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

// Stylus Middleware (functions that handles request)
app.use(logger('dev')); //replaces your app.use(express.logger());
app.use(stylus.middleware({ 
	src: __dirname + '/stylus',
	dest: __dirname + '/public',
	compile: compile
}))

app.use(express.static(__dirname + '/public/'));

// Render the Index page
app.get('/', function(req, res){
	res.render('index', 
		{ title: "Welcome" }
	);
})

app.listen(portnumber);

console.log("Server is now running on a port " + portnumber);