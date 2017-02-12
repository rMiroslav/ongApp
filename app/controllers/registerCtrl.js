
var User = require('../models/user');

module.exports = function(req, res){

  if(!req.body.email || !req.body.password){
    res.json({success:false, message:'Please enter an email and password to register!'});
  }else{
    var newUser = new User({
      email: req.body.email,
      password:req.body.password
    });

    newUser.save(function(err){
      if(err){
        console.log("err", err);
        return res.json({success:false, message:'Email already exists!'});
      }else{
        res.json({success:true, message:'User was created'});
      }

    });
  }
};
