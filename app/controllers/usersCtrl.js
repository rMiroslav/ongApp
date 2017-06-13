
var User = require('../models/user');
var config = require('../../config/main');


var findOne = function(req,res){
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if(err) throw err;
    res.json({success: true, user:user})

  });  
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

// exports.activateAcount = activateAcount;
exports.findOne = findOne;
