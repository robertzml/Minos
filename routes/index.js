var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {

    if(req.session.username) {
        res.render('index', { title: '主页' });
    } else {
        res.redirect('user/login');
    }

});



module.exports = router;
