var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

//Ong schema
var OngSchema = new mongoose.Schema({
  email:{
    type:String,
    lowercase:true,
    unique:true,
    required: true
  },
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
    activated:{
    type:Number,
    default: 0
  },
    emailcode:{
    type:String,
    required:true
  },
  aproved:false,
  role:{
    type:String,
    enum:['Ong'],
    default:'Ong'
  },
  createdAt: {
    type: Date,
     default: Date.now
    }
});
module.exports = mongoose.model('Ong', OngSchema);
