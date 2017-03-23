
define(function (require, exports, module) {
	var $ = window.jQuery = require('lib/jquery');
	var head = require('head');
	var bs = require('../bootstrap/js/bootstrap.min');
	
	$('.way').on('click', function (e) {
		$('.way.on').removeClass('on');
		$(this).addClass('on');
	})
});

