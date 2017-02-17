var express = require('express');
var router = express.Router();
var registerCtrl = require('../controllers/registerCtrl');
var authCtrl = require('../controllers/authCtrl');
var passport = require("passport");
var jwt = require("jsonwebtoken");



router.post('/register', registerCtrl.CreateUser);
router.post('/guest', registerCtrl.CreateGuest);
router.post('/login', authCtrl.findUser);
router.get('/dashboard', function(req, res){
  res.send('It worked! User id is: ' + req.user.id + '.' );
});
router.get('/list', function(req, res){
  res.send('List and User is: ' + req.user.email + '.' );
});


module.exports = router;
