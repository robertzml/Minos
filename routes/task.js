/* the task manage */

var express = require('express');
var router = express.Router();
var moment = require('moment');

//var status = require('../models/entitystatus');
var mongodb = require('../models/mongodb');

// 任务总览
router.get('/', function(req, res) {

    mongodb.find('task', {}, function(result) {

        res.render('task/index', { title: '任务总览', data: result })
    });
});




// 任务领取
router.get('/take-list', function(req, res) {

    mongodb.find('task', { status: 11 }, function(result) {

        res.render('task/take-list', { title: '可领任务', data: result });
    });
});


// 任务信息
router.get('/details/:id', function(req, res) {
    var id = req.params.id;

    mongodb.findById('task', id, function(result) {
        if (result == null) {
            throw new Error('Not Found');
        }

        var Encoder = require('node-html-encoder').Encoder;
        var encoder = new Encoder('entity');
        result.taskContent = encoder.htmlDecode(result.taskContent);

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
        deliveryUser: {
            userId: req.session.userid,
            userName:  req.session.username
        },
        time: time,
        status: status
    })

    res.redirect('/task');
});


router.get('/take/:id', function(req, res) {
    var id = req.params.id;
    var time = moment().toISOString()

    mongodb.updateById('task', id, {
        takeUser: {
            userId: req.session.userid,
            userName:  req.session.username
        },
        takeTime: time,
        status: 12
    });
    res.redirect('/task');
});


module.exports = router;