var Express      = require('express');
var Users    = require('../models/usersModel');
var Async        = require('async');

var  getAllUsers = function(req,res,next){
    console.log("get all users");
    Users.getAllUsers(null,function(err, users){
        if(err){
            res.status(500).json({err: err});
        }else{
            res.json({users: users});
        }
    });
};

var  getUserById = function(req,res,next){
    console.log("get users by food");
    var id = req.params.id;
    if(!id){
        res.status(400).json({err: "Missing user id!"});
    }else{
        Users.findUserById(id,function(err, user){
            if(err){
                res.status(500).json({err: err});
            }else{
                res.json({user: user});
            }
        });
    }
};
//
//var  findUsersByAgeGroup = function(req,res,next){
//    console.log("get users by food");
//    var lb = req.body.lowerBound,
//        ub = req.body.upperBound;
//    if(!lb || !ub){
//        res.status(400).json({err: "Missing limit param(s)!"});
//    }else{
//        Users.findUsersByAgeGroup(lb,ub,function(err, users){
//            if(err){
//                res.status(500).json({err: err});
//            }else{
//                res.json({users: users});
//            }
//        });
//    }
//};

var router = Express.Router();
//router.post('/users/ageGroup',findUsersByAgeGroup);
router.get('/users/findById:id',getUserById);
router.get('/users',getAllUsers);
module.exports = router;
