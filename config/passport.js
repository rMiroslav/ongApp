var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User  = require('../app/models/user');
var Guest  = require('../app/models/guest');
var config = require('../config/main');


module.exports = function(passport){
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, function(jwt_playload, done){
    User.findOne({id:jwt_playload.id}, function(err, user) {
      if(err){
        return done(err, false);
      }
      if(user){
        done(null, user);
      }else{
        done(null, false);
      }
    });
  }));
};
