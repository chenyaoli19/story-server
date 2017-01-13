var Event = require('../daos/eventDao');
const YEAR_ARRAY = [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
                    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
const BATCH_NUM = 3;

var createEvent = function(params, callback){
    var event = new Event();
    event.title = params.title;
    event.content = params.content;
    event.year = params.year;
    event.imageUrl = params.imageUrl;

    event.save(callback);
};

var getFirstBatchEvents = function(callback){
    var first_batch = YEAR_ARRAY.slice(0,3);
    Event.find({year:{$in:first_batch}}).lean().exec(callback);
};

var getNextBatchEvents = function(prevPos, callback){
    var curPos = prevPos + 1;
    var cur_batch = YEAR_ARRAY.slice(curPos, curPos + BATCH_NUM);
    Event.find({year: {$in: cur_batch}}).lean().exec(callback);
};

var eventModel = {};
eventModel.createEvent = createEvent;
eventModel.getFirstBatchEvents = getFirstBatchEvents;
eventModel.getNextBatchEvents = getNextBatchEvents;

module.exports = eventModel;
