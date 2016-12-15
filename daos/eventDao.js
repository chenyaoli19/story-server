var Mongoose = require('mongoose');
var eventSchema = new Mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    year: {type: String, required: true},
    imageUrl:[{type: String, default: null}],
});
module.exports = Mongoose.model('event',eventSchema);