"use strict";
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

module.exports = function (sequelize, DataTypes){
  // defining a sequelize model
  var User = sequelize.define('User', {
    email: { // <----- this is an attribute
      type: DataTypes.STRING, 
      unique: true, 
      validate: {
        len: [6, 30], // check length on create
      }
    },
    passwordDigest: { //<------ this is an attribute
      type:DataTypes.STRING,
      validate: {
        notEmpty: true //<--- passwordDigest
      }
    }
  },
/******END of ATTRIBUTES******/
  {
    instanceMethods: {
      checkPassword: function(password) {
        return bcrypt.compareSync(password, this.passwordDigest);
      }
    },
    classMethods: {
      encryptPassword: function(password) {
        var hash = bcrypt.hashSync(password, salt);
        return hash;
      },
      createSecure: function(email, password) {
        if(password.length < 6) {
          throw new Error("Password too short");
        }
        return this.create({
          email: email,
          passwordDigest: this.encryptPassword(password)
        });

      },
      authenticate: function(email, password) {
        // find a user in the DB
        return this.find({
          where: {
            email: email
          }
        }) 
        .then(function(user){
          if (user === null){
            throw new Error("Email does not exist");
          }
          else if (user.checkPassword(password)){
            return user;
          }

        });
      }

    } // close classMethods
  }); // close define user
  return User;
}; // close 