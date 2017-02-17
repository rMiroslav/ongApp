var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");


//Guest schema
var GuestSchema = new mongoose.Schema({
  email:{
    type:String,
    unique:true,
    required: true
  },
  password:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
     expires: '24h',
     default: Date.now
    },
  role:{
    type:String,
    enum:['Guest'],
    default:'Guest'
  }
});

// //Save guest hash password
GuestSchema.pre('save', function(next){
  var guest = this;
  if(this.isModified('password') || this.isNew){
    bcrypt.genSalt(10, function(err, salt){
      if(err){
        return next(err);
      }
      bcrypt.hash(guest.password, salt, function(err, hash){
          if(err){
            return next(err);
          }
          guest.password = hash;
          next();
      });
    });
  }else{
    return next();
  }
});

//compare the password
GuestSchema.methods.comparePassword = function(pw, cb){
    bcrypt.compare(pw, this.password, function(err, isMatch){
      if(err){
        return cb(err);
      }
      cb(null, isMatch);

    });
};

module.exports = mongoose.model('Guest', GuestSchema);
