var Story = require('../daos/storyDao');

var createStory = function(params,callback){
    var story = new Story();
    story.userId = params.userId;
    story.year = params.year;
    story.eventId = params.eventId;
    story.title = params.title;
    story.content = params.content;
    story.imageUrl = params.imageUrl;//how to implement image update and save function

    story.save(callback);
};

var getAllStories = function(callback){
    Story.find({}).lean().exec(callback);
};

var getStoryByYear = function(year, callback){
    Story.find({year:year}).lean().exec(callback);
};

var getStoryByEvent = function(eventId, callback){
    Story.find({eventId:eventId}).lean().exec(callback);
};

var storyModel = {};
storyModel.createStory = createStory;
storyModel.getAllStories = getAllStories;
storyModel.getStoryByYear = getStoryByYear;
storyModel.getStoryByEvent = getStoryByEvent;

module.exports = storyModel;
