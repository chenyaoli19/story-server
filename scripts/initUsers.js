var Async = require('async');
var User = require('../../daos/usersDao.js');

var  mongoose = require('mongoose');
var db = mongoose.connect('localhost','myApp');
var fs = require('fs');

fs.readFile('users.json','utf8',function(err,data){
    if(err) return console.log(err);
    users = JSON.parse(data);
    for(var i = 0; i<users.length; i++){
        var user = new User();
        var params = users[i];
        users.email = params.email;
        users.firstName = params.firstName;
        users.lastName = params.lastName;
        users.userName = params.userName;
        users.age = params.age;
        users.food = params.food;
        user.save(function(err,data){
            if(err){
                console.log(err);
            }
            else{
            }
        })
    }
    console.log("Total add" + users.length +"users.");
});