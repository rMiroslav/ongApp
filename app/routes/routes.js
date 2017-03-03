var express = require('express');
var router = express.Router();
var registerCtrl = require('../controllers/registerCtrl');
var authCtrl = require('../controllers/authCtrl');
var passport = require("passport");
var jwt = require("jsonwebtoken");
var path = require("path");



router.post('/register', registerCtrl.CreateUser);
router.post('/guest', registerCtrl.CreateGuest);
router.post('/login', authCtrl.findOne);
// router.get('/', function(req, res){
//   console.log(req.body);
//   // res.send("you are in!!!")
//   var filePath = "./public/dash/index.html"
//   var resolvedPath = path.resolve(filePath);
//   console.log(resolvedPath);
//   res.sendFile(resolvedPath);
//   // res.render('views/pages/home', {title:'Home'});
// });


// router.get('/register', function(req, res){
//     res.render('views/pages/register', {title:'register'});
//   // res.send('List and User is: ' + req.user.email + '.' );
// });
//
// router.get('/login', function(req, res){
//     res.render('views/pages/login', {title:'Login'});
//   // res.send('List and User is: ' + req.user.email + '.' );
// });

// router.get('/home', function(req, res){
//   res.render('views/pages/home', {title:'Home'});
// });
//
// router.get('/about', function(req, res){
//   res.render('views/pages/about', {title:'About'});
// });
//


module.exports = router;
