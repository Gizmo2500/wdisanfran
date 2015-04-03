// required variables
var express = require("express"),
	ejs = require("ejs"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override");
// Now instantiate the exoress app
var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false}));


app.get('/', function(req, res){
	res.render("index");
});

app.post('/add', function(req, res){
	var x = Number(req.body.add1);
	var y = Number(req.body.add2);
	var sum = x + y;
	res.send("The Sum is: " + sum);
	res.redirect('/');
});

app.post('/subtract', function(req, res){
	var x = Number(req.body.sub1);
	var y = Number(req.body.sub2);
	var sub = x - y;
	res.send("The difference is: " + sub);
	res.redirect('/');
});

app.post('/multiply', function(req, res){
	var x = Number(req.body.mult1);
	var y = Number(req.body.mult2);
	var mult = x * y;
	res.send("The multiple is: " + mult)
	res.redirect('/');
});

app.post('/divide', function(req, res){
	var x = Number(req.body.div1);
	var y = Number(req.body.div2);
	var div = x / y;
	res.send("The result is: " + div);
	res.redirect('/');
});


app.listen(3000, function(){
	console.log('=====LISTENING=====');
});