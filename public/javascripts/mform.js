/* This is the project script class */

var Mform = function() {

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

    var handleAuditForm = function($dom) {
        var form1 = $('#audit-form');
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);

        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input

            rules: {
                'audit-content': {
                    required: true
                }
            },

            messages: {
                'audit-content': {
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

    var handleChangePasswordForm = function($dom) {
        var form1 = $('#change-password-form');
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);

        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input

            rules: {
                oldpassword: {
                    required: true
                },
                newpassword: {
                    required: true,
                    minlength: 3
                },
                confirmpassword: {
                    required: true,
                    equalTo: "#newpassword"
                }
            },

            messages: {
                oldpassword: {
                    required: "请输入内容."
                },
                newpassword: {
                    required: "请输入内容.",
                    minlength: jQuery.validator.format("最少输入 {0} 位密码")
                },
                confirmpassword: {
                    required: "请输入内容.",
                    equalTo: "两次输入密码不一致"
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

    var handleCreateUserForm = function() {
        var form1 = $('#create-user-form');
        var error1 = $('.alert-danger', form1);
        var success1 = $('.alert-success', form1);

        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input

            rules: {
                userid: {
                    required: true,
                    digits: true,
                    rangelength: [6, 6]
                },
                name: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 3
                },
                confirmpassword: {
                    required: true,
                    equalTo: "#password"
                },
                username: {
                    required: true
                }
            },

            messages: {
                password: {
                    required: "请输入内容.",
                    minlength: jQuery.validator.format("最少输入 {0} 位密码")
                },
                confirmpassword: {
                    required: "请输入内容.",
                    equalTo: "两次输入密码不一致"
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
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['insert', ['table', 'hr']],
                ['misc', ['redo', 'undo']]
            ]
        });
        //API:
        //var sHTML = $('#summernote_1').code(); // get code
        //$('#summernote_1').destroy(); // destroy
    }


    return {

        loadBuildingList: function($dom) {
            handleBuildingList($dom);
        },

        initSummernote: function($dom) {
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

        initAuditForm: function() {
            handleSummernote($('#summernote'));
            handleAuditForm();
        },

        initChangePasswordForm: function() {
            handleChangePasswordForm()
        },

        initCreateUserForm: function() {
            handleCreateUserForm();
        }

    }
}();
