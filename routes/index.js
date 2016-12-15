var Express     = require('express');
    //User        = require('../models/usersModel'),
var register = function(req, res, next) {
    var params = req.body;
    if (!params || !params.email || !params.firstName || !params.lastName || !params.password) {
        res.status(400).json({err: 'invalid params'});
    } else {
        User.createAccount(params, function(err, user){
            if (err) {
                res.status(500).json({err: err});
            } else {
                // don't return password
                user.password = undefined;
                var token = Token.generate(user);
                // return the access token as well
                res.json({token: token, user: user});
            }
        });
    }
};
var forgetPassword = function(req, res, next) {
    var params = req.body;
    if (!params || !params.email) {
        console.log(params.email);
        res.status(400).json({err: 'invalid params'});
    } else {
        User.forgetPassword(params, function(err, user){
            if (err) {
                res.status(500).json({err: err});
            } else {
                console.log(params.email);
                var token = Token.generate(user);
                // return the access token as well
                res.json({token: token, user: user});
            }
        });
    }
}
var emailResetPassword = function(req, res, next) {
    var userID = req.params.uid;
    var psd = req.body;
    if (!userID || !psd) {
        res.status(400).json({err: 'invalid params'});
    } else {
        User.emailResetPassword(userID, psd, function(err, user) {
            if(err) {
                res.status(500).json({err:err});
            } else {
                res.send('Reset Password Success!');
            }
        });
    }
}
var login = function(req, res, next) {
    var email = req.query.email,
        password = req.query.password;
    // if email or password empty
    if (!email || !password) {
        res.status(400).json({err: 'email and password required'});
    } else {
        User.login(req.query, function (err, user) {
            if (err) {
                res.status(500).json({err: err});
            } else {
                if (user) {
                    user.password = undefined;
                    var token = Token.generate(user);
                    res.json({token:token, user: user});
                } else {
                    res.status(400).json({err: 'user not found'});
                }
            }
        });
    }
};
var validateEmail = function(req, res, next) {
    var key = req.query.activationKey;
    // if key empty
    if (!key) {
        res.status(400).json({err: 'activationKey required'});
    } else {
        User.validateEmail(key, function (err, user) {
            if (err) {
                res.status(500).json({err: err});
            } else {
                if (user) {
                    user.password = undefined;
                    res.json({user: user});
                } else {
                    res.status(400).json({err: 'User with the key not found'});
                }
            }
        });
    }
};
var forwardEmail = function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    if (!name || !email) {
        res.status(400).json({err: 'name and email required'});
    } else {
        var params = {
            name: name,
            email: email,
            industry: req.body.industry ? req.body.industry : null,
            description: req.body.description ? req.body.description : null
        };
        Emailer.forwardEmail(params, function(err, result){
            if (err) {
                res.status(500).json({err: err});
            } else {
                res.json({forwardStatus: result});
            }
        });
    }
};
var sendActivateEmail = function(req, res, next) {
    var userId = req.query.userId;
    if (!userId) {
        res.status(400).json({err: 'userId required'});
        return;
    }
    // find user
    User.sendActivationEmail(userId, function(err, result){
        if (err) {
            res.status(500).json({err: err});
        } else {
            res.json({activationKey: result});
        }
    });

};
var testNotification = function(req, res, next) {
    var topic = {
        "_id" : "558eeb572d554c6b037ff8da",
        "author" : "558ee99d2d554c6b037ff8d8",
        "content" : "test this content",
        "title" : "test this title",
        "views" : 0,
        "replies" : 1,
        "category" : {
            "industry" : "Apple"
        },
        "tags" : [
            "dp"
        ],
        "__v" : 0
    };
    var nf = NotificationFactory.create('topic');
    var topicNF = new nf(topic,'NEW_REPLY');
    topicNF.publish();
    res.json({});
}
var heartbeat = function(req, res, next) {
    // get token, update token
    var decoded = Auth.getDecodedToken(req);
    if (!decoded) {
        res.status(500).json({err: 'token invalid'});
        return;
    }
    var uid = decoded.uid;
    User.findById(uid, function(err, user){
        if (err) {
            res.status(500).json({err: err});
        } else {
            var token = Token.generate(user);
            res.json({token:token, user: user});
        }
    });
}
var router = Express.Router();
/* POST /create */
router.post('/register', register);
/* PUT /forgetPassword */
router.put('/forgetPassword', forgetPassword)
/* PUT /emailResetPassword */
router.put('/emailResetPassword/:uid', emailResetPassword);
/* GET /login */
router.get('/login', login);
/* GET /sendActivateEmail */
router.get('/sendActivateEmail', Auth.ensureLogin, sendActivateEmail);
/* GET /validateEmail */
router.get('/validateEmail', validateEmail);
router.get('/testNotification', testNotification);
router.get('/heartbeat', heartbeat);
router.post('/forwardEmail', forwardEmail);
module.exports = router;