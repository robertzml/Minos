var express = require('express');
var router = express.Router();


// a middleware with no mount path, gets executed for every request to the router
// check login middleware
router.use(function (req, res, next) {

    if(req.session.username) {
        next();
    } else {
        if (req.originalUrl == '/user/login')
            next();
        else
            res.redirect('/user/login');
    }

});


/* GET home page. */
router.get('/', function(req, res) {

    if(req.session.username) {
        res.render('index', { title: '主页' });
    } else {
        res.redirect('user/login');
    }

});



module.exports = router;
