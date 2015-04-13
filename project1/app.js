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

app.use("/", function(req,res,next) {
	req.login = function(user) {
		req.session.userId = user.id;
	};
	req.currentUser = function() {
		return db.User.find(req.session.userId)
		         .then(function(dbUser) {
		         	req.user = dbUser;
		         	return dbUser;
		         });
	};
	req.logout = function() {
		req.session.userId = null;
		req.user = null;
	};
	next();
});


	//root route for the app
	app.get('/', function(req, res){
		res.render("index", {title: "InstaSave"});
	});
	// route to render search page
	app.get('/search', function(req,res){
		res.render('search');
	});


	//login route
	app.get('/login', function(req, res){
		res.render('login');
	});

	app.post('/login', function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	db.User.authenticate(email,password)
	  .then(function(dbUser){
	  	if(dbUser) {
	  		req.login(dbUser);
	  		res.redirect('/profile');
	  	} else {
	  		res.redirect('/login');
	  	}
	  }); 
});

	//sign up route
	app.get('/signup', function(req, res){
		res.render('signup');
	});

	app.post('/signup', function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	db.User.createSecure(email,password)
	  .then(function(user){
	  	res.redirect('login');
	  });
});


	//profile route
	app.get('/profile', function(req,res){
		res.render('profile');
	});

	db.sequelize.sync().then(function() {
	app.listen(3000, function() {
		console.log('Server listening on port 3000');
	});
});