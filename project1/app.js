	

	//variable definitions
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

	//this ceates a session in the browser
	app.use(session({
		secret: "I'm very very secret thing",
		resave: false,
		save: {
			uninitialize: true
		}
	}));


	//access to body-parser npm module 
	app.use(bodyParser.urlencoded({extended: true}));

	//access to method override npm module
	app.use(methodOverride("_method"));


	//Custom middleware to access user related authentication and autorization
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
	// used the ajax google API
	app.get('/search', function(req,res){
		var q = req.query.q || null ;
		var start = req.query.start || 0;

		if (!q) {
			res.render("search", {results: [], noResults: true});
		} else {
			var url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + q + '&start=' + start;
			var nextFour = '/search?q='+encodeURI(q)+'&start='+(parseInt(start)+4);
			var prevFour = '/search?q='+encodeURI(q)+'&start='+(parseInt(start)-4 < 0 ? 0 : start-4);

			
			
			request(url, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					var results = JSON.parse(body).responseData.results;
					console.log(results);
					res.render('search', { results: results, prevFour: prevFour, nextFour: nextFour, noResults: false});
				} else {
					res.send('Something went wrong with the API');
				}
			});

			
		} 
	});

	


	// login route that renders the information on the login page
	app.get('/login', function(req,res){
		req.currentUser().then(function(user){
			if (user) {
				res.redirect('/profile');
			} else {
				res.render("login");
			}
		});
	});



	//the route is used to autenticate the user's identity
	app.post("/login", function(req, res){
		var user= req.body.user;
			db.User.authenticate(user.email, user.password)
				.then(function(user){
					req.login(user);
						res.redirect('/profile');
				});
	});



	//This route clears deletes the user's session from the browser
	app.delete('/logout', function(req,res){
		req.logout();
			res.redirect('/login');
	});



	//sign up route to the sign up page
	app.get('/signup', function(req, res){
		res.render('signup');
	});



	//This route adds a person to the User table in postgres
	//The createSecure method hashes the user's password to make it difficult to gain access to the user's information.
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







	//profile route finds the current user's information and displays that information on the screen
	//by access the user with the .find route and then accessing the Favorite images by using the .getFavimages method
	 app.get('/profile', function(req,res){
	 		if (req.session.userId){
	 			db.User.find(req.session.userId)
	 			.then(function(dbUser) {
	 				dbUser.getFavimages()
	 				.then(function(dbImages) {
	 					res.render('profile', { user: dbUser, images: dbImages });
	 				})
	 			})
	 		} else {
	 					res.redirect('/login');
	 		}
	 	
	 });

 //defined a variable imgurl to favorites route to reference the form on the search.ejs page
 //Then, I looked up the current user with req.currentUser method, and if the user is accessed,
 //The method .addToFavs is used to add the image to the users profile page.
	 app.post('/favorites', function(req,res){
	 	var imgurl = req.body.imgurl;
	 	req.currentUser().then(function(dbUser){
			if (dbUser) {
	 			dbUser.addToFavs(db,imgurl).then(function(){
	 				res.redirect('/profile');
	 			});
	 		} else {
					res.redirect('/login');
			}
	 	}); 
	 });
//this allow is to remove a picture from a users profile. 
//first you need to use the .find method to access the current user. 
//Next,you need to look up the users Favorite images with .getFavimages method.
//Finally, use the .destroy method to remove the selected image from the database
	app.delete('/unfavorite', function(req,res){
		var imgurl =req.body.imgurl;
			if (req.session.userId){
	 			db.User.find(req.session.userId)
	 			.then(function(dbUser) {
	 				dbUser.getFavimages()
	 				.then(function() {
	 				db.Favimage.find({where: {imgurl: imgurl}})
                	  .then(function(img){
                  		img.destroy();
            	      		res.redirect('/profile');
                	  });

	 				})
	 			})
			} else {
							res.redirect('/login');
		}
	});	

	app.listen(process.env.PORT || 3000); 


