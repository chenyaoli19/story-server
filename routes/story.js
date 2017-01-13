var Express = require('express');
var Story = require('../models/storyModel');

var createStory = function(req,res){
    var params = req.body;
    Story.createStory(params,function(err,data){
        if(err){
            res.status(500).json({err:err});
        }else{
            res.send(data);
        }
    });
};

var getAllStories = function(req, res){
    Story.getAllStories(function(err, data){
       if(err){
           res.status(500).json({err:err});
       }else{
           res.send(data);
       }
    });
};

var getStoryByYear = function(req,res){
    var year = req.params.year;
    Story.getStoryByYear(year,function(err, data){
        if(err){
            res.status(500).json({err:err});
        }else{
            res.send(data);
        }
    });
};

var getStoryByEvent = function(req,res){
    var eventId = req.params.eventId;
    Story.getStoryByEvent(eventId,function(err, data){
        if(err){
            res.status(500).json({err:err});
        }else{
            res.send(data);
        }
    });
};

var router = Express.Router();
router.post('/create',createStory);
router.get('/getAll',getAllStories);
router.get('/getByYear/:year',getStoryByYear);
router.get('/getByEvent/:eventId',getStoryByEvent);
module.exports = router;
