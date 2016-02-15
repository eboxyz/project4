//controller dependencies
var User = require('../models/user');
var mongoose = require('mongoose');

//setup user auth
exports.showUsers = function(req, res, next){
  User.find({}, function (err, users){
    res.json(users);
  })
};

exports.createUser = function(req, res, next){
  var newUser = new User();
  var keys = Object.keys(req.body);
  keys.forEach(function (key){
    newUser[key] = req.body[key];
  });
  newUser.save(function(err){
    if(err) console.log(err);
    else res.send('user created!!')
  });
};

exports.editUser = function(req, res, next){
  User.findById({_id: req.params.id}, function(err, user){
    var keys = Object.keys(req.body.local);
    keys.forEach(function(key){
      user.local[key] = req.body.local[key];
    });
    user.local.save();
  });
  res.send('user updated')
};

exports.deleteUser = function(req, res, next){
  User.findOneAndRemove({_id: req.params.id}, function(err, user){
    if(err) res.json('user not deleted');
    else res.json('user has been deleted')
  })
}
