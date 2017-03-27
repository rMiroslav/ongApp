
var User = require('../models/user');
var Guest = require('../models/guest');
var jwt = require("jsonwebtoken");
var passport = require("passport");
var config = require('../../config/main');



require('../../config/passport')(passport);

var findOne = function(req,res){
  if(req.body.role == 'volunteer'){
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if(err) throw err;

    if(!user){
      res.send({success:false, message:'Authentication faild. User not found!'});
    }else{
      user.comparePassword(req.body.password, function(err, isMatch){

        if(isMatch && !err){
          //create the token
          // console.log(user);
          var optsUser ={
            id:user.id,
            name:user.first_name + ' ' + user.last_name,
            email:user.email,
            active:user.active,
            role:user.role
          }
          var token = jwt.sign(optsUser, config.secret);
          req.headers = {};
          req.headers.authorization = 'Bearer ' + token;
          res.json({ success:true, token:'Bearer ' + token, user:optsUser});
        }else{
          res.send({success: false, message: 'Authentication faild. Password did not match!'});
        }
      })
    }

  });
  }
}

var activateAcount = function(req, res){
  User.findOne({email: req.params.email}, function(err, user){
      if(req.params.email == user.email && req.params.emailcode == user.emailcode && user.active != 1){
        User.update({email: req.params.email}, {active:1}, function(err, result){
          if(err){
            console.log(err)
          }else{
            res.redirect('http://localhost:8080/#!/dashboard');
          }
        })
    }else if(user.active == 1){
      res.send('User already active')
    }else{
      res.send('Activation error! Please contact Volunteer Support!')
    }
  })

   
}

exports.activateAcount = activateAcount;
exports.findOne = findOne;
