/* the task manage */

var express = require('express');
var router = express.Router();
var moment = require('moment');

//var status = require('../models/entitystatus');
var mongodb = require('../models/mongodb');

var taskCollection = 'task';


function decodeContent(content) {
    var Encoder = require('node-html-encoder').Encoder;
    var encoder = new Encoder('entity');
    return encoder.htmlDecode(content);
}

// 任务总览
router.get('/', function(req, res) {

    mongodb.find(taskCollection, {}, function(result) {

        res.render('task/index', { title: '任务总览', data: result })
    });
});


// 任务信息
router.get('/details/:id', function(req, res) {
    var id = req.params.id;

    mongodb.findById(taskCollection, id, function(result) {
        if (result == null) {
            throw new Error('Not Found');
        }

        result.taskContent = decodeContent(result.taskContent);

        res.render('task/details', { title: '任务信息', data: result });
    });
});


// 任务下发
router.get('/delivery', function(req, res) {

    res.render('task/delivery', { title: '任务下发' });
});

// 任务下发
router.post('/delivery', function(req, res) {

    var Encoder = require('node-html-encoder').Encoder;
    var encoder = new Encoder('entity');

    var buildingId = req.body['building'];
    var buildingName = req.body['building-name'];
    var address = req.body['address'];
    var gateway = req.body['gateway'];
    var ammeter = req.body['ammeter'];
    var title = req.body['title'];
    var taskContent = encoder.htmlEncode(req.body['task-content']);
    var time = moment().toISOString()
    var type = 1;
    var status = 11;

    mongodb.insert('task', {
        title: title,
        type: type,
        buildingId: buildingId,
        buildingName: buildingName,
        address: address,
        gateway: gateway,
        ammeter: ammeter,
        taskContent: taskContent,
        delivery: {
            userId: req.session.userid,
            userName:  req.session.username,
            time: time
        },
        timestamp: time,
        status: status
    })

    res.redirect('/task');
});


// 我的任务列表
router.get('/mine-list', function(req,res) {
    var userId = req.session.userid;

    mongodb.find(taskCollection, { 'take.userId': userId }, function(result) {
        res.render('task/mine-list', { title: '我的任务', data: result });
    });
});


// 我的任务查看
router.get('/mine-details/:id', function(req, res) {
    var id = req.params.id;

    mongodb.findById(taskCollection, id, function(result) {
        if (result == null) {
            throw new Error('Not Found');
        }

        result.taskContent = decodeContent(result.taskContent);

        res.render('task/mine-details', { title: '任务信息', data: result });
    });
});


// 任务反馈
router.post('/feedback', function(req, res) {
    var id = req.body['id'];
    var type = req.body['feedback-type'];
    var content = req.body['feedback-content'];
    var time = moment().toISOString();

    var status = 0;
    if (type == 1) {
        status = 13;
    } else {
        status = 14;
    }

    mongodb.updateById(taskCollection, id, {
        feedback: {
            content: content,
            time: time
        },
        status: status
    });
    res.redirect('/task/mine-list');
});


// 任务领取列表
router.get('/take-list', function(req, res) {

    mongodb.find(taskCollection, { status: 11 }, function(result) {

        res.render('task/take-list', { title: '可领任务', data: result });
    });
});


// 任务领取查看
router.get('/take-details/:id', function(req, res) {
    var id = req.params.id;

    mongodb.findById(taskCollection, id, function(result) {
        if (result == null) {
            throw new Error('Not Found');
        }

        result.taskContent = decodeContent(result.taskContent);

        res.render('task/take-details', { title: '任务信息', data: result });
    });
});


// 提交任务领取
router.post('/take', function(req, res) {
    var id = req.body['id'];
    var time = moment().toISOString();

    mongodb.updateById(taskCollection, id, {
        take: {
            userId: req.session.userid,
            userName:  req.session.username,
            time: time
        },
        status: 12
    });
    res.redirect('/task/mine-list');
});


module.exports = router;