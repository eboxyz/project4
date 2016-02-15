//state dependencies for routes
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


//grab functions from controllers
var usersController = require('../controllers/usersController')
var loginController = require('../controllers/loginController');

router.route('/', function(req,res, next){
  res.render('../views/index.html')
  next();
})

module.exports = router
