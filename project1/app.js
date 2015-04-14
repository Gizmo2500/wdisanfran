	var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		request = require('request'),
		pg = require('pg'),
		methodOverride = require('method-override');
		db = require('./models');

	var app = express();
	//view engine for the app
	app.set('view engine', 'ejs');

	app.use(session({
	secret: "I'm very very secret thing",
	resave: false,
	save: {
		uninitialize: true
	}
}));


	//access to body-parser npm module 
	app.use(bodyParser.urlencoded({extended: true}));

	app.use(methodOverride("_method"));

app.use("/", function(req,res,next) {
	req.login = function(user) {
		req.session.userId = user.id;
	},
	req.currentUser = function() {
		return db.User.find(req.session.userId)
		         .then(function(dbUser) {
		         	req.user = dbUser;
		         	return dbUser;
		         });
	},
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
	// route to render search and search query
	app.get('/search', function(req,res){
		var q = req.query.q;
		if (!q) {
		res.render("search", {results: [], noResults: true});
		}else{
			var url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + q;

			request(url, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					var results = JSON.parse(body).responseData.results;
					console.log(results);
					res.render('search', { results: results });
				} else {
					res.send('Something went wrong with the API');
				}
			});
		} 
	});


	//login route
	app.get('/login', function(req,res){
		req.currentUser().then(function(user){
			if (user) {
				res.redirect('/profile');
			} else {
				res.render("login");
			}
		});
	});

	app.post("/login", function(req, res){
	var user= req.body.user;

		db.User.authenticate(user.email, user.password)
			.then(function(user){
				req.login(user);
				res.redirect('/profile');
			});
});

	app.delete('/logout', function(req,res){
		req.logout();
		res.redirect('/login');
});

	//sign up route
	app.get('/signup', function(req, res){
		res.render('signup');
	});

	app.post('/signup', function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	var firstName = req.body.first;
	var lastName = req.body.last;
	var phone = req.body.phone;
	var userN = req.body.usrname;
	db.User.createSecure(email,password,firstName,lastName,phone,userN)
	  .then(function(user){
	  	res.redirect('login');
	  });
});


	//profile route
	 app.get('/profile', function(req,res){
	 	req.currentUser().then(function(dbUser){
	 		res.render('profile', {username: dbUser.userName, email: dbUser.email, first: dbUser.firstName, last: dbUser.lastName});
	 	});
	 	
	 });

	db.sequelize.sync().then(function() {
	app.listen(3000, function() {
		console.log('Server listening on port 3000');
	});
});