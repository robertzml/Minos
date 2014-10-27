/* This is the project script class */

var Minos = function() {

    return {
        menuActive: function($dom) {

            var parent = $dom.parent();
            parent.addClass('active');

            var li = $dom.closest('li.top-level-menu');
            li.addClass('active');
            //li.find('a').append('<span class="selected"></span>');
            //li.find('.arrow').addClass('open');
        }
    }
}();
