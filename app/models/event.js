'use strict';

var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
 title:{
    type:String,
    required:true
 },
 location:{
    type:String,
    required:true
 },
 volunteers:{
     type:Number
 },
 createdBy:{
    type:String,
    required:true
 },
 content:{
    type:String,
    require:true
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
    },
ong_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ong'
    },
tags:[String],
active:{
    type:Number,
    default: 0
},
phone:{
    type:Number
},
address:{
    type:String,
    required:true
},
likes:{
    type:Number,
    default:0
},
views:{
    type:Number,
    default:0
},
eventId:{
    type:Number,
    required:true,
    default:0
}
});
module.exports = mongoose.model('Event', EventSchema);
