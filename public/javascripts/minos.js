/* This is the project script class */

var Minos = function() {

    var handleBuildingList = function($dom) {


        var url = 'http://localhost:11621/api/building/200001';
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus) {
                // data 可能是 xmlDoc, jsonObj, html, text, 等等...

            }
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
                form.submit(); // form validation success, call ajax form submit
            }
        });

    }


    var handleSummernote = function ($dom) {
        $dom.summernote({height: 300});
        //API:
        //var sHTML = $('#summernote_1').code(); // get code
        //$('#summernote_1').destroy(); // destroy
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

        },

        initSummernote: function($dom) {
            handleSummernote($dom);
        },


        initDeliveryForm: function() {
            handleBuildingList();
            handleSummernote($('#taskcontent'));
            handleDeliveryForm();
        }
    }
}();
