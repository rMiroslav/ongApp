'use strict';
var Event = require('../models/event');

var createEvent = function(req, res){
    console.log(req.body)
    if(!req.body.ong_id){
        res.json({success:false, message:'User id not found!'});
    }else{
         var newEvent = new Event({    
            title:req.body.title,
            createdBy:req.body.createdBy,
            location:req.body.location,
            volunteers:req.body.volunteers,
            content:req.body.content,
            start:req.body.start, 
            end:req.body.end, 
            ongoing:req.body.ongoing,
            ong_id:req.body.ongId,
            tags:req.body.tags,
            active:req.body.active,
            phone:req.body.pthone,
            address:req.body.address
        });

          newEvent.save(function(err){
            if(err){
                return res.json({success:false, message:'Event already exists!'});
            }else{
                
                // next();
                res.json({success:true, message:'Event was created'});
            }

    });  
    }
}

var findAll = function(req, res){
    Event.find(function(err, result){
            if(err){
                return res.json({success:false, message:'Somthing went wrong'});
            }else{
                
                // next();
                res.json({success:true, data: result});
            }
    })
}

exports.findAll = findAll;
exports.createEvent = createEvent;