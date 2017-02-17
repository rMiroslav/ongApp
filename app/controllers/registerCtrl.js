
var User = require('../models/user');
var Guest = require('../models/guest');
var Ong = require('../models/ong');
var jwt = require("jsonwebtoken");
var passport = require("passport");
var config = require('../../config/main');
require('../../config/passport')(passport);


//User
var CreateUser = function(req, res){
  if(!req.body.email || !req.body.password){
    res.json({success:false, message:'Please enter an email and password to register!'});
  }else{
    var newUser = new User({
      email: req.body.email,
      password:req.body.password
    });

    newUser.save(function(err){
      if(err){
        return res.json({success:false, message:'Email already exists!'});
      }else{
        res.json({success:true, message:'User was created'});
      }

    });
  }

};

//Guest
var CreateGuest= function(req, res, next){
  if(!req.body.email || !req.body.password){
    // res.json({success:false, message:'Please enter an email and password to register!'});
  }else{
    function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
    var newGuest = new Guest({
      email: makeid() +'@guest.com',
      password: "NewGuest2017"
    });

    newGuest.save(function(err){
      if(err){
        // return res.json({success:false, message:'Email already exists!'});
      }else{
        // res.json({success:true, message:'Guest was created'});
        //Find Guest
        Guest.findOne({
          email: newGuest.email
        }, function(err, guest){
            if(err) throw err;
            if(!guest){
              res.send({success:false, message:'Authentication faild. Guest not found!'});
            }else{
              guest.comparePassword("NewGuest2017", function(err, isMatch){
                if(isMatch && !err){
                  //create the token

                  var optsGuest = {id:guest.id};
                  var token = jwt.sign(optsGuest, config.secret);
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
    });
  }
};

//Ong
var CreateOng= function(req, res){
  if(!req.body.email || !req.body.password){
    res.json({success:false, message:'Please enter an email and password to register!'});
  }else{
    var newOng = new Ong({
      email: req.body.email,
      password: req.body.password
    });

    newOng.save(function(err){
      if(err){
        return res.json({success:false, message:'Email already exists!'});
      }else{
        res.json({success:true, message:'Ong was created'});
      }

    });
  }
};

exports.CreateUser = CreateUser;
exports.CreateGuest = CreateGuest;
exports.CreateOng = CreateOng;
