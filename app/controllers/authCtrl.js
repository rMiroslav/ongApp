
var User = require('../models/user');
var Guest = require('../models/guest');
var jwt = require("jsonwebtoken");
var passport = require("passport");
var config = require('../../config/main');
require('../../config/passport')(passport);

var findUser = function(req,res){
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
            email:user.email
          }
          var token = jwt.sign(optsUser, config.secret);
          req.headers = {};
          req.headers.authorization = 'Bearer ' + token;
          res.json({ success:true, token:'Bearer ' + token});
        }else{
          res.send({success: false, message: 'Authentication faild. Password did not match!'});
        }
      })
    }

  });
}

var fingOng = function(req, res){

}
exports.findUser = findUser;
exports.fingOng = fingOng;
