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
    var style = '';
    switch(val) {
        case 11:
            output = '新任务';
            style = 'bg-blue';
            break;
        case 12:
            output = '已领取';
            style = 'bg-purple';
            break;
        case 13:
            output = '已修理';
            style = 'bg-purple-medium';
            break;
        case 14:
            output = '存在问题';
            style = 'bg-purple-plum';
            break;
        case 20:
            output = '任务完成';
            style = 'bg-green';
            break;
        case 21:
            output = '审核未通过';
            style = 'bg-blue-chambray';
            break;
        case 22:
            output = '问题解决';
            style = 'bg-blue-steel';
            break;
    }

    if (t == 'badge') {
        output = "<span class='todo-tasklist-badge badge badge-roundless " + style + "'>" + output + "</span>";
    } else if (t == 'label') {
        output = "<span class='label " + style +"'>" + output + "</span>";
    }
    return output;
};