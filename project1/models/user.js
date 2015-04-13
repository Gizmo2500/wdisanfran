"use strict";
 var bcrypt = require("bcrypt");
 var salt = bcrypt.genSaltSync(10);

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: { 
      type: DataTypes.STRING, 
      unique: true, 
      validate: {
        len: [6, 30],
      }
    },
    passwordDigest: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }

    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNum: DataTypes.STRING,
    userName: DataTypes.STRING
  }, 

  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};