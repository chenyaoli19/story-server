var User = require('../daos/usersDao');

var getAllUsers = function(params, callback) {
    User.find({}).lean().exec(callback);
};
var findUserById = function(id, callback) {
    User.find({_id: id}).lean().exec(callback);
};

var userModel = {};
userModel.getAllUsers = getAllUsers;
userModel.findUserById = findUserById;

module.exports = userModel;