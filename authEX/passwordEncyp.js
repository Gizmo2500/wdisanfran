var bcrypt = require('bcrypt');

function User(email, password) {
  var salt = bcrypt.genSaltSync(10);
  this.email = email;
  this.password_digest = bcrypt.hashSync(password, salt);
};

var Mike = new User('mjdesa@gmail.com', 'password');
var Del = new User('delmer@ga.co', 'password2');
console.log("Mike is", Mike);
console.log("Del is", Del);