
var User = require('../models/user');
var jwt = require("jsonwebtoken");
var passport = require("passport");
var config = require('../../config/main');
require('../../config/passport')(passport);

module.exports = function(req, res){
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
          var token = jwt.sign(user, config.secret, {
            expiresIn: 10080 // seconds
          });
          res.json({ success:true, token:'JWT ' + token});
        }else{
          res.send({success: false, message: 'Authentication faild. Password did not match!'});
        }
      })
    }

  });
};
