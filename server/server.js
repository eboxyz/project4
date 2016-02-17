var express = require('express');
var app = express();
var rp = require('request-promise');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var dotenv = require('dotenv').config();
var passport = require('passport');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

//mongo connections (local+mongolab)
// mongoose.connect('mongodb://localhost/gameStuff')
mongoose.connect('mongodb://heroku_tg23vpt5:72qsqn1abk15rckjliop1l91v3@ds059195.mongolab.com:59195/heroku_tg23vpt5')

//secret for JWT to create tokens
var superSecret = process.env.superSecret

//allows access to methods in passport file
//initialize passport for usage in app
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

//allowing usage of json
//allows RESTful routing through url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var routes = require('./config/routes')
app.use('/', routes);

//configure apple to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
  Authorization');
  next();
});

require('./controllers/loginController.js')(app, passport)

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
//seed user
require('./db/seed.js').seedUsers();

app.listen(process.env.PORT || 8080, function(){
  console.log('port open on localhost:8080')
})
