// Require the modules we're going to need:
var express = require("express"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

// Now instantiate our express app:
var app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

var classmates = []	
//Set root route
app.get('/', function(req, res) {

    res.render("index", { classmates: classmates});
});

app.post('/add', function(req, res){
	//req.params //request params
	//req.query // query params
	//req.body // body params
	classmates.push(req.body);
	res.redirect('/');
});

app.listen(3000, function(){
	console.log('Server listening on port 3000');
});
