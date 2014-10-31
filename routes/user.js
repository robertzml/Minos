var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var mongodb = require('../lib/mongodb');

var userCollection = 'user';


// 登录
router.get('/login', function(req, res) {
    res.render('user/login', { title: '登录' });
});


router.post('/login', function(req, res) {

    var username = req.body["username"];
    var password = req.body["password"];
    var remember = req.body["remember"];

    var sha1 = crypto.createHash('sha1');
    var sha1sum = sha1.update(password).digest('hex');

    mongodb.findOne(userCollection, { name: username }, function(result) {

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


// 注销
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});


// 修改密码
router.get('/changepassword', function(req, res) {
    res.render('user/change-password', { title: '修改密码' });
});


router.post('/changepassword', function(req, res) {
    var userid = req.session.userid;
    var oldpassword = req.body["oldpassword"];
    var newpassword = req.body["newpassword"];

    var sha1 = crypto.createHash('sha1');
    var oldsum = sha1.update(oldpassword).digest('hex');

    mongodb.findOne(userCollection, { id: userid }, function(result) {
        if (result.password != oldsum) {

            res.locals.error = '原密码错误';
            res.render('user/change-password', { title: '修改密码' });

        } else {
            sha1 = crypto.createHash('sha1');
            var newsum = sha1.update(newpassword).digest('hex');
            mongodb.update('user', { id: userid }, { password: newsum }, function() {
                res.redirect('/user/logout');
            });
        }
    });

});


// 用户列表
router.get('/list', function(req, res) {

    mongodb.find(userCollection, {}, function(result) {
        res.render('user/list', { title: '用户列表', data: result });
    });

});


// 添加用户
router.get('/create', function(req, res) {
    res.render('user/create', { title: '添加用户' });
});

router.post('/create', function(req, res) {
    var id = req.body["userid"];
    var name = req.body["name"];
    var password = req.body["password"];
    var userGroupId = req.body["userGroupId"];
    var username = req.body["username"];
    var telephone = req.body["telephone"];
    var remark = req.body["remark"];

    mongodb.find(userCollection, {
        $or: [
            { id: id },
            { name: name }
        ]},
        function(result) {
            if (result.length != 0 ) {

                res.locals.error = '用户ID或用户名存在';
                res.render('user/create', { title: '添加用户' });
            } else {

                var sha1 = crypto.createHash('sha1');
                var passsum = sha1.update(password).digest('hex');

                mongodb.insert(userCollection, {
                    id: parseInt(id),
                    name: name,
                    password: passsum,
                    userGroupId: parseInt(userGroupId),
                    userName: username,
                    telephone: telephone,
                    remark: remark,
                    status: 0
                }, function() {
                    res.redirect('/user/list');
                });
            }

    });
});

module.exports = router;
