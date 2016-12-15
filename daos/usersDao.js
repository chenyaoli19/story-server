var Mongoose = require('mongoose');
var usersSchema = new Mongoose.Schema({
    email: { type: String, required: true, unique: true },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: {type: String, required: true, unique: true},
    age:{type: Number, required: false},
    gender:{type: String, required: false}
});
usersSchema.index({ email: 1 }, { userName: 1 });
module.exports = Mongoose.model('users', usersSchema);