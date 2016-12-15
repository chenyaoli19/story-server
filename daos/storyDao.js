var Mongoose = require('mongoose');
var storySchema = new Mongoose.Schema({
    userId: {type: String, required: true},
    year: {type: String, required: true},
    eventId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: true}
});

module.exports = Mongoose.model('story',storySchema);