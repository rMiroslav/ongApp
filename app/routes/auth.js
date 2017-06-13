var express = require('express');
var router = express.Router();
var registerCtrl = require('../controllers/registerCtrl');
var authCtrl = require('../controllers/authCtrl');
var usersCtrl = require('../controllers/usersCtrl');
var mail = require('../../config/mail');
var passport = require("passport");
var jwt = require("jsonwebtoken");
var path = require("path");


router.post('/register', registerCtrl.CreateUser, mail.activateAcount, function(req,res){
    res.json({success:true, message:'User was created'});
});
router.post('/guest', registerCtrl.CreateGuest);
router.post('/login', authCtrl.findOne);
router.get('/activate/:email/:emailcode', authCtrl.activateAcount);
router.get('/findOne', usersCtrl.findOne);
// router.get('/', function(req, res){
//   console.log(req.body);
//   // res.send("you are in!!!")
//   var filePath = "./public/dash/index.html"
//   var resolvedPath = path.resolve(filePath);
//   console.log(resolvedPath);
//   res.sendFile(resolvedPath);
//   // res.render('views/pages/home', {title:'Home'});
// });


module.exports = router;
