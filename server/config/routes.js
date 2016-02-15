//state dependencies for routes
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


//grab functions from controllers
var usersController = require('../controllers/usersController')
var loginController = require('../controllers/loginController');

//testing for hello world
router.route('/', function(req,res, next){
  res.render('../views/index.ejs')
})

//routes for user CRUDability
router.route('/api/user/create').post(usersController.createUser);
router.route('/api/user/:id/delete').delete(usersController.deleteUser);
router.route('/api/users').get(usersController.showUsers);
router.route('/user/:id/edit').put(usersController.editUser);


module.exports = router
