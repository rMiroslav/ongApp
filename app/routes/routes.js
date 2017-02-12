var express = require('express');
var router = express.Router();
var registerCtrl = require('../controllers/registerCtrl');
var authCtrl = require('../controllers/authCtrl');
var passport = require("passport");
var jwt = require("jsonwebtoken");



router.post('/register', registerCtrl);
router.post('/login', authCtrl);
router.get('/dashboard', passport.authenticate('jwt', {session:false}), function(req, res){
  res.send('It worked! User id is: ' + req.user._id + '.' );
});


module.exports = router;
