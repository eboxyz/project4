//logincontroller dependencies
var express = require('express');
var User = require('../models/user');
var userController = require('./usersController');
var mongoose = require('mongoose');

module.exports = function(app, passport){
  //local login routing
  app.get('/', function(req,res){
    if(req.session && req.session.username){
      console.log(req.session)
      User.findOne( {username: req.session.username})
        .then(function(user){
          res.render('index.html', {
            curr_user: user.username,
            users: null
          })
        })
    } else{
      User.findAsync({})
        .then(function(users){
          res.render('index.ejs',{
            curr_user: null,
            users: users
          })
        }).catch();
    }
    // req.session.save();
  });
  //local login through passport-local
  app.get('/local/login', function(req,res){
    console.log(req.session)
    if(req.session && req.session.username){
      User.findOne({ username: req.session.username})
        .then(function(user){
          res.render('index.html', {
            curr_user: user.username,
            users: null
          })
        })
    } else{
      User.findAsync({})
        .then(function(users){
          res.render('index.html',{
            curr_user: null,
            users: users
          })
        }).catch();
    }
    req.session.save();
  });

  app.post('/local/login', passport.authenticate('local-login',{
    successRedirect: '/',
    failureRedirect: '/local/login'
  }));
  //local sign-in through passport-local
  app.get('/local/signup', function(req, res){
    if (req.session && req.session.username){
      User.findOne({ username: req.session.username })
        .then(function(users){
          res.render('/users/signup', {
            curr_user: user.username,
            users: null
          })
        })
    } else{
      User.findAsync({})
        .then(function(users){
          res.render('/users/signup', {
            curr_user: null,
            users: users
          })
        }).catch()
    }
    req.session.save();
  });
  //local logout through passport-local
  app.post('/local/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/local/signup'
  }));

  //facebook oauth
    //facebook oauth login
  app.get('/auth/facebook',
    passport.authenticate('facebook', {scope: 'email'})
  );
    //facebook callback function
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {successRedirect: '/',
    failureRedirect: '/'
    })
  );
    //facebook oauth logout
  app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/')
  });


}
