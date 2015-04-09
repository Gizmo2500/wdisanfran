	var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		request = require('request'),
		pg = require('pg');

	var app = express();
	//view engine for the app
	app.set('view engine', 'ejs');

	//access to body-parser npm module 
	app.use(bodyParser.urlencoded({extended: true}));




	//root route for the app
	app.get('/', function(req, res){
		res.render("index", {title: "My title"});
	});

	app.get('/search', function(req,res){
		res.render('search');
	});


	app.listen(3000, function(){
		console.log('Server is running');
	});