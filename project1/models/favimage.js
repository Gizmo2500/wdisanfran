"use strict";
module.exports = function(sequelize, DataTypes) {
  var Favimage = sequelize.define("Favimage", {
    imgurl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
        // associations can be defined here
      }
    }
  });
  return Favimage;
};