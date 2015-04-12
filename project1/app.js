	var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		request = require('request'),
		pg = require('pg'),
		db = require('./models');

	var app = express();
	//view engine for the app
	app.set('view engine', 'ejs');

	//access to body-parser npm module 
	app.use(bodyParser.urlencoded({extended: true}));




	//root route for the app
	app.get('/', function(req, res){
		res.render("index", {title: "My title"});
	});
	// route to render search page
	app.get('/search', function(req,res){
		res.render('search');
	});


	//login route
	app.get('/login', function(req, res){
		res.send("login Page");
	});

	//sign up route
	app.get('/signup', function(req, res){
		res.render('signup');
	});

	//profile route
	app.get('/profile', function(req,res){
		res.send('profile page');
	});

	app.listen(3000, function(){
		console.log('Server is running');
	});