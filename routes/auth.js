var Express = require('express');
var router = Express.Router();
router.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
});
module.exports = router;

