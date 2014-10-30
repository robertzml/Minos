var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var mongodb = require('../lib/mongodb');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});


router.get('/login', function(req, res) {
    res.render('user/login', { title: '登录' });
});


router.post('/login', function(req, res) {

    var username = req.body["username"];
    var password = req.body["password"];
    var remember = req.body["remember"];

    var sha1 = crypto.createHash('sha1');

    var sha1sum = sha1.update(password).digest('hex');


    mongodb.findOne('user', { name: username }, function(result) {

        if (result == null) {

            res.locals.error = '用户不存在';
            res.render('user/login', { title: '登录' });

        } else {
            if (result.password == sha1sum) {

                req.session.userid = result.id;
                req.session.name = result.name;
                req.session.username = result.userName;
                req.session.userGroupId = result.userGroupId;

                res.redirect('/');
            } else {
                res.locals.error = '密码错误';
                res.render('user/login', { title: '登录' });
            }
        }

    });

});


router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});


module.exports = router;
