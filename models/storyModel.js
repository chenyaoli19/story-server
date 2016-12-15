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

var storyModel = {};
storyModel.createStory = createStory;

module.exports = storyModel;