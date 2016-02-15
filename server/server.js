var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.connect('mongodb://localhost:27017/gameStuff')

app.use(passport.initialize());
app.use(passport.session());

var routes = require('./config/routes')
app.use('/', routes);

require('./controllers/loginController.js')(app, passport)


app.listen(process.env.PORT || 3000, function(){
  console.log('port open on localhost:3000')
})
