/* the task manage */

var express = require('express');
var router = express.Router();

var mongodb = require('../models/mongodb');



router.get('/delivery', function(req, res) {

    res.render('task/delivery', { title: '任务下发' });
});



router.post('/delivery', function(req, res) {

    res.render('task/delivery', { title: '任务下发' });
});


module.exports = router;