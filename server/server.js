var express = require('express');
var app = express();
var rp = require('request-promise');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var passport = require('passport');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();

//mongo connections (local+mongolab)
mongoose.connect('mongodb://localhost/gameStuff')
// mongoose.connect('mongodb://heroku_tg23vpt5:72qsqn1abk15rckjliop1l91v3@ds059195.mongolab.com:59195/heroku_tg23vpt5')


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

require('./controllers/loginController.js')(app, passport)

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
//seed user
require('./db/seed.js').seedUsers();

app.listen(process.env.PORT || 3000, function(){
  console.log('port open on localhost:3000')
})
