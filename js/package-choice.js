
define(function (require, exports, module) {
	var $ = window.jQuery = require('lib/jquery');
	var bs = require('../bootstrap/js/bootstrap.min');
	
	var selects = $('.select-box');
	selects.on('click', function (e) {
		selects.not(this).find('.list').hide();
		var select = $(this);
		select.find('.list').toggle();
		var target = e.target;
		if (target.tagName === "LI") {
			select.find('.list li').removeClass('on');
			$(target).addClass('on');
			select.find('em').text($(target).text());
			select.find('input').val($(target).attr('data-value'));
		}
	});
});

