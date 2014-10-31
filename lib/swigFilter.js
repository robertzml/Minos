var moment = require('moment');

/*
 * use : {{ someString|substring(10) }}
 * */
 exports.substring = function (input, count) {
    return input.toString().substr(0, count);
};


/*
 use: {{ time|moment(t) }}
 */

exports.moment = function(input, t) {
    var m = moment(input);

    if (m.isValid()) {
        if (t == 'dt')
            return m.format("YYYY-MM-DD HH:mm:ss");
        else
            return input;
    }
    else
        return '';
};


/*
 use: {{ somestype|type }}
 */
exports.tasktype = function(input) {
    var val = parseInt(input);
    var output = '';
    switch (val) {
        case 1:
            output = '维修任务';
            break;
        case 2:
            output = '新增设备';
            break;
        case 10:
            output = '其它任务';
            break;
    }

    return output;
}

/*
    use: {{ somestatus|status }}
 */
exports.status = function(input, t) {
    var val = parseInt(input);
    var output = '';
    switch(val) {
        case 11:
            output = '新任务';
            break;
        case 12:
            output = '已领取';
            break;
        case 13:
            output = '已修理';
            break;
        case 14:
            output = '存在问题';
            break;
        case 20:
            output = '任务完成';
            break;
        case 21:
            output = '审核未通过';
            break;
        case 22:
            output = '问题解决';
            break;
    }

    if (t == 'badge') {
        output = "<span class='todo-tasklist-badge badge badge-roundless'>" + output + "</span>";
    }
    return output;
};