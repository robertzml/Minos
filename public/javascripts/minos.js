/* This is the project script class */

var Minos = function() {

    var startDate = moment('2014-01-01');
    var endDate = moment();

    var handleBuildingList = function($dom) {

        var url = 'http://202.195.145.230:8001/api/building';
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            contentType: 'application/json'
        }).success(function (data, textStatus) {
            $dom.append("<option data-name='' value=''></option>");

            $.each(data, function(i, item) {
               var option = $('<option/>')
                   .attr('data-name', item.Name)
                   .val(item.Id)
                   .text(item.Name);
                $dom.append(option);
            });

            $dom.select2({
                placeholder: "选择建筑",
                allowClear: true
            }).on("change", function(e) {

                if (e.added) {
                    var option = $(e.added.element[0]);
                    $('#building-name').val(option.attr('data-name'));

                } else {
                    $('#building-name').val('');
                }

            });

        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText || textStatus);
        });
    }

    var handleSummernote = function ($dom) {
        $dom.summernote({
            height: 300,
            toolbar: [
                //[groupname, [button list]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough']],
                ['style', ['fontsize', 'fontname', 'color']],
                ['para', ['hr', 'ul', 'ol', 'paragraph']],
                ['insert', ['table']],
                ['height', ['height']],
                ['misc', ['redo', 'undo']]
            ]
        });
        //API:
        //var sHTML = $('#summernote_1').code(); // get code
        //$('#summernote_1').destroy(); // destroy
    }

    /* just init the datatable */
    var handleInitDatatable = function($dom, filter) {

        var oTable = $dom.dataTable({
            "order": [],

            "lengthMenu": [
                [5, 10, 20, -1],
                [5, 10, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "pagingType": "bootstrap_full_number",

            "language": {
                "lengthMenu": "  _MENU_ 记录",
                "sLengthMenu": "每页 _MENU_ 条记录",
                "sInfo": "显示 _START_ 至 _END_ 共有 _TOTAL_ 条记录",
                "sInfoEmpty": "记录为空",
                "sInfoFiltered": " - 从 _MAX_ 条记录中",
                "sZeroRecords": "结果为空",
                "sSearch": "搜索:",
                "paginate": {
                    "previous":"Prev",
                    "next": "Next",
                    "last": "Last",
                    "first": "First"
                }
            },

            "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12' p>>" // horizobtal scrollable datatable
        });

        if(filter) {
            $dom.find("tfoot th").each(function (i) {
                if ($(this).attr('data-filter') == 'true') {

                    var select = $('<select class="form-control"><option value=""></option></select>')
                        .appendTo($(this).empty())
                        .on('change', function () {
                            var val = $(this).val();

                            oTable.api().column(i)
                                .search(val ? '^' + $(this).val() + '$' : val, true, false)
                                .draw();
                        });

                    oTable.api().column(i).data().unique().sort().each(function (d, j) {
                        if ($(d).html()) {
                            select.append('<option value="' + $(d).html() + '">' + $(d).html() + '</option>')
                        } else {
                            select.append('<option value="' + d + '">' + d + '</option>')
                        }

                    });
                }
            });
        }

        return oTable;
    }


    var handleDateRangePickers = function ($dom, callback) {
        if (!jQuery().daterangepicker) {
            return;
        }

        $dom.daterangepicker({
            opens: 'left',
            startDate: moment('2014-01-01'),
            endDate: moment(),
            minDate: '2014-01-01',
            maxDate: '2020-12-31',
            dateLimit: {
                days: 180
            },
            showDropdowns: true,
            showWeekNumbers: true,
            timePicker: false,
            timePickerIncrement: 1,
            timePicker12Hour: true,
            ranges: {
                '全部': [moment('2014-01-01'), moment()],
                '今天': [moment(), moment()],
                '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '最近7天': [moment().subtract(6, 'days'), moment()],
                '最近30天': [moment().subtract(29, 'days'), moment()],
                '上周': [moment().day(-6), moment().day(0)],
                '本周': [moment().day(1), moment().day(7)],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            buttonClasses: ['btn'],
            applyClass: 'green',
            cancelClass: 'default',
            format: 'YYYY-MM-DD',
            separator: ' 至 ',
            locale: {
                applyLabel: '查询',
                cancelLabel: '取消',
                fromLabel: '开始',
                toLabel: '结束',
                customRangeLabel: '自定义',
                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                firstDay: 1
            }
        }, function (start, end) {
            $dom.find('span').html(start.format('YYYY-MM-DD') + ' 至 ' + end.format('YYYY-MM-DD'));
        }).on('apply.daterangepicker', function(ev, picker) {
            console.log(picker.startDate.format('YYYY-MM-DD'));
            console.log(picker.endDate.format('YYYY-MM-DD'));
            startDate = picker.startDate;
            endDate = picker.endDate;

            callback(picker.startDate, picker.endDate);
        });

        //Set the initial state of the picker label
        $dom.find('span').html(moment('2014-01-01').format('YYYY-MM-DD') + ' 至 ' + moment().format('YYYY-MM-DD'));
        callback(moment('2014-01-01'), moment());
    }

    var handleTaskType = function(input) {
        var val = parseInt(input);
        var output = '';
        switch (val) {
            case 1:
                output = '电表维修';
                break;
            case 2:
                output = '新增设备';
                break;
            case 3:
                output = '水表维修';
                break;
            case 10:
                output = '其它任务';
                break;
        }

        return output;
    }

    var handleTaskStatus = function(input) {
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

        return output;
    }

    return {
        menuActive: function($dom) {

            var parent = $dom.parent();
            parent.addClass('active');

            var li = $dom.closest('li.top-level-menu');
            li.addClass('active');
            //li.find('a').append('<span class="selected"></span>');
            //li.find('.arrow').addClass('open');
        },

        loadBuildingList: function($dom) {
            handleBuildingList($dom);
        },

        initSummernote: function($dom) {
            handleSummernote($dom);
        },

        initDatatable: function($dom) {
            return handleInitDatatable($dom);
        },

        initDatatableWithFilter: function($dom) {
            return handleInitDatatable($dom, true);
        },

        initTaskTable: function($dom) {
            var oTable = handleInitDatatable($dom, true);
            oTable.api().order( [ 4, 'desc' ] ).draw();

            $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {

                    var dt = moment(data[4]);

                    var f = moment(dt).isBefore(endDate) && moment(dt).isAfter(startDate);
                    return f;
                }
            );

            handleDateRangePickers($('#task-range'), function(startDate, endDate) {

                oTable.api().draw();

            });
        },

        initStatisticTable: function($dom) {

            var oTable = $dom.dataTable({
                "order": [],

                "lengthMenu": [
                    [5, 10, 20, -1],
                    [5, 10, 20, "All"] // change per page values here
                ],

                "ajax": "/statistic/task-count",

                "columns": [
                    { "data": "_id.type" },
                    { "data": "_id.status" },
                    { "data": "count" }

                ],

                "columnDefs": [{
                    "targets": 0,
                    "data": "_id.type",
                    "render": function (data, type, full, meta) {
                        return handleTaskType(data);
                    }
                }, {
                    "targets": 1,
                    "data": "_id.status",
                    "render": function (data, type, full, meta) {
                        return handleTaskStatus(data);
                    }
                }],

                // set the initial value
                "pageLength": 10,

                "pagingType": "bootstrap_full_number",

                "language": {
                    "lengthMenu": "  _MENU_ 记录",
                    "sLengthMenu": "每页 _MENU_ 条记录",
                    "sInfo": "显示 _START_ 至 _END_ 共有 _TOTAL_ 条记录",
                    "sInfoEmpty": "记录为空",
                    "sInfoFiltered": " - 从 _MAX_ 条记录中",
                    "sZeroRecords": "结果为空",
                    "sSearch": "搜索:",
                    "paginate": {
                        "previous":"Prev",
                        "next": "Next",
                        "last": "Last",
                        "first": "First"
                    }
                },

                "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12' p>>" // horizobtal scrollable datatable
            });

            return oTable;
        },

        initDataRangePicker: function($dom, callback) {
            handleDateRangePickers($dom, callback);
        },


        parseDatetime: function(dt) {
            return moment(dt).format("YYYY-MM-DD HH:mm:ss");
        }
    }
}();
