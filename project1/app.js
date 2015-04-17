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
		var q = req.query.q ;

		var start = req.query.start || 0;
		if (!q) {
		res.render("search", {results: [], noResults: true});
		}else{
			var url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + q + '&start=' + start;

			// var nexturl =  'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + q + '&start=' + (start + 4);
			
			request(url, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					var results = JSON.parse(body).responseData.results;
					console.log(results);
					res.render('search', { results: results});
				} else {
					res.send('Something went wrong with the API');
				}
			});

			// request(nexturl, function(error, response, body){
			// 	if(!error && response.statusCode === 200) {
			// 		var nextResults = JSON.parse(body).responseData.results;
			// 		console.log(nextResults);
			// 		res.render('search', { nextResults: results, nexturl: nexturl });
			// 	} else {
			// 		res.send('Something went wrong with the API');
			// 	}
			// });
		} 
	});

	// app.get('/nextSearch', function(req, res){

	// 	var q = req.query.q;

	// 	var start = req.query.start || 0;

	// 	var nexturl =  'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + q + '&start=' + (start + 4);

	// 	request(nexturl, function(error, response, body){
	// 			if(!error && response.statusCode === 200) {
	// 				var nextResults = JSON.parse(body).responseData.results;
	// 				console.log(nextResults);
	// 				res.render('search', { nextResults: nextResults, nexturl: nexturl });
	// 			} else {
	// 				res.send('Something went wrong with the API');
	// 			}
	// 		});
	// });


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







	//profile route find user information and displays information


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

 //defined a variable imgurl to favorites route to reference the favorites button on the 
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

app.delete('/unfavorite', function(req,res){
	var imgurl =req.body.imgurl;
		if (req.session.userId){
	 			db.User.find(req.session.userId)
	 			.then(function(dbUser) {
	 				dbUser.getFavimages()
	 				.then(function() {
	 					// dbUser.remFromFavs(db,imgurl).then(function(){
	 					// 	console.log("faf;lsj");
	 					// 	res.redirect('/profile');
	 					// });
	 				console.log("\n\n\nn\n\n\nIMAGEURL", imgurl)
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


	db.sequelize.sync().then(function() {
	app.listen(process.env.PORT || 3000, function() {
		console.log('Server listening on port 3000');
	});
});