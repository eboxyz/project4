var User = require('../models/user');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var localStrategy = require('passport-local')


module.exports = function(passport){
  passport.serializeUser(function (user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function (obj, done){
    done(null, obj);
  });

  //local authentication for site
  passport.use('local-signup', new LocalStrategy({
    name: 'name',
    username: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, username, password, done){
      process.nextTick(function(){
        User.findOne({
          'local.username': username
        }, function (err, user){
          if(err) return done(err);

          if(user){
            return done(null, false);
          } else{
            console.log(req.body);
            var newUser = new User();
            newUser.local.name = req.body.name;
            newUser.local.username = req.body.username;
            newUser.local.password = newUser.generateHash(password);
            newUser.save( function(err){
              console.log('new user created')
              if(err) throw err;
              return done(null, newUser);
            });
          }
        })
      })
    }
  ));

}
