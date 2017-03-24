define(function (require, exports, module) {
	var $ = require('lib/jquery');
	var head = require('head');
    var bs = require('../bootstrap/js/bootstrap.min');
    $('#tab').on('click', 'span', function (e) {
    	var span = $(this);
    	var t = span.attr('data-target');
    	console.log(t)
    	if (t) {
    		$('#tab span.on').removeClass('on');
    		span.addClass('on');
    		var target = $(t);
    		$('.from-div.on').removeClass('on');
    		target.addClass('on');
    	}
    })
});

