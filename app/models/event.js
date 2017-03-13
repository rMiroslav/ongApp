var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 createdBy:{
    type:String,
    required:true
 },
 start:{
    type:Date,
    required:true
 }, 
  end:{
    type:Date
 }, 
 ongoing:{
     type:String
 },
  createdAt: {
    type: Date,
     default: Date.now
    }
});
module.exports = mongoose.model('Event', EventSchema);
