var Express = require('express');
var Event = require('../models/eventModel');

var createEvent = function(req,res){
    var params = req.body;
    Event.createEvent(params, function(err, data){
        if(err){
            res.status(500).json({err:err});
        }else{
            res.send(data);
        }
    });
};

var getFirstBatch = function(req,res){
    Event.getFirstBatchEvents(function(err, data){
        if(err){
            res.status(500).json({err:err});
        }else{
            res.send(data);
        }
    });
};

var getNextBatch = function(req, res){
    var prevPos = req.body.prevYearPos;
    Event.getNextBatchEvents(prevPos,function(err, data){
        if(err){
            res.status(500).json({err: err});
        }else{
            res.send(data);
        }
    });
};

var router = Express.Router();

router.post('/create', createEvent);
router.get('/getFirstBatchEvent', getFirstBatch);
router.post('/getNextBatch', getNextBatch);

module.exports = router;
