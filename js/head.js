/**
存放 head 相关JS
*/
define(function (require, exports, module) {
	var $ = require('lib/jquery');
	var $m = $('#products-menu');
	var _timer = null;
	$m.on('mouseenter', function (e) {
		clearTimeout(_timer);
		$('#drop-menu').show();
	}).on('mouseleave', function (e) {
		_timer = setTimeout(function () {
			$('#drop-menu').hide();
		}, 500);		
	});
});

