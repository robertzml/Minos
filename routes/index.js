var express = require('express');
var router = express.Router();


// a middleware with no mount path, gets executed for every request to the router
// check login middleware
/*router.use(function (req, res, next) {

    if(req.session.username) {
        next();
    } else {
        if (req.originalUrl == '/user/login')
            next();
        else
            res.redirect('/user/login');
    }

});*/

/* GET home page. */
router.get('/', function(req, res) {

    if(req.session.username) {
        if (req.session.userGroupId == 100001 || req.session.userGroupId == 100002) {
            res.redirect('/task');
        } else {
            res.redirect('/task/mine-list');
        }
        //res.render('index', { title: '主页' });

    } else {
        res.redirect('user/login');
    }

});



module.exports = router;
