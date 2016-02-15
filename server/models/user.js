'use strict';

var mongoose = require('mongoose')
var bcrypt = require('bcrypt')


//user schema for mongo model
var userSchema = mongoose.Schema({
  facebook: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  },
  local:{
    username: String,
    name: String,
    password: String
  }
});


//encrypt password - genSalt by bcrypt
userSchema.methods.generateHash = function (password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(11), null);
};

//check encrypted password
userSchema.methods.validPass = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
