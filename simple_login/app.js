var express = require('express'),
    bodyParser = require('body-parser'),
    db = require("./models"),
    session = require("express-session"),
    app = express();

app.set("view engine", "ejs"); // <--- throw in ejs

// setting up middleware for bodyParser

app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true
}));
//make your own middle-ware
//it runs this with every user
app.use("/", function (req, res, next) {

  req.login = function (user) {
    req.session.userId = user.id;
  };

  req.currentUser = function () {
    return db.User.
      find({
        where: {
          id: req.session.userId
       }
      }).
      then(function (user) {
        req.user = user;
        return user;
      })
  };

  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }

  next(); 
});


// this is a first route
app.get("/signup", function (req, res) {
  res.send("Coming soon");
});

// where the user submits the sign-up form
app.post("/users", function (req, res) {

  // grab the user from the params
  var user = req.body.user;

  // create the new user
  db.User.
    createSecure(user.email, user.password,
      function (msg){
        res.send(msg);
      }, 
      function(){
        res.send("SIGNED UP!");
      });
});
//login page 
app.get('/login', function(req, res){
	res.render("login");
});

app.post("/login", function(req, res){
	var user= req.body.user;

		db.User.authenticate(user.email, user.password)
			.then(function(user){
				req.login(user);
				res.redirect('/profile');
			});
});

app.get("/profile", function (req, res) {
  req.currentUser()
      .then(function (user) {
        res.render('profile', {user: user});
      });
});

// listen on PORT 3000
app.listen(3000, function () {
  console.log("SERVER RUNNING");
});
