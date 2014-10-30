/* This is the project script class */

var Minos = function() {

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


    var handleDeliveryForm = function() {

        var form1 = $('#delivery-form');
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);

        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input

            rules: {
                title: {
                    required: true
                }
            },

            messages: {
                title: {
                    required: "请输入用户名."
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();

                //$('textarea[name="task-content"]').val($('#summernote').code());
                form.submit(); // form validation success, call ajax form submit
            }
        });

    }

    var handleFeedbackForm = function() {
        var form1 = $('#feedback-form');
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);

        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input

            rules: {
                'feedback-content': {
                    required: true
                }
            },

            messages: {
                'feedback-content': {
                    required: "请输入内容."
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                success1.hide();
                error1.show();
                Metronic.scrollTo(error1, -200);
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            submitHandler: function (form) {
                success1.show();
                error1.hide();

                form.submit(); // form validation success, call ajax form submit
            }
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
    var handleInitDatatable = function($dom) {

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

            "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12' p>>", // horizobtal scrollable datatable
        });
        return oTable;
    }

    /* filter table */
    var handleInitDatatable2 = function($dom) {

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

            "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12' p>>", // horizobtal scrollable datatable
        });

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
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            }
        });

        return oTable;
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

        initSummernote: function($dom, content) {
            handleSummernote($dom);
        },


        initDeliveryForm: function() {
            handleSummernote($('#summernote'));
            handleDeliveryForm();
        },

        initFeedbackForm: function() {
            handleSummernote($('#summernote'));
            handleFeedbackForm();
        },

        initDatatable: function($dom) {
            return handleInitDatatable($dom);
        },

        initDatatableWithFilter: function($dom) {
            return handleInitDatatable2($dom);
        },

        parseDatetime: function(dt) {
            return moment(dt).format("YYYY-MM-DD HH:mm:ss");
        }
    }
}();
