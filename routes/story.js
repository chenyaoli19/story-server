var Express = require('express');
var Story = require('../models/storyModel');

var createStory = function(req,res,next){
    var params = req.body;
    Story.createStory(params,function(err,data){
        if(err){
            res.status(500).json({err:err});
        }else{
            res.send(data);
        }
    });
};

var router = Express.Router();
router.post('/create',createStory);
module.exports = router;