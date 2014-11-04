/* the statistic file */

var express = require('express');
var router = express.Router();

var mongodb = require('../lib/mongodb');

// 任务总览
router.get('/', function(req, res) {

    res.render('statistic/index', { title: '任务统计' });

});


// 任务统计计数
router.get('/task-count', function(req, res) {

    mongodb.aggregate('task', [
        {$project: {_id:0,  type:1, status: 1}},
        {$group: {
            _id: {status: '$status', type: '$type' },
            count: { $sum: 1}
        }}], function(result) {
            res.json({ data: result});
    });
});

module.exports = router;