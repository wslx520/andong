
define(function (require, exports, module) {
	var $ = window.jQuery = require('lib/jquery');
	var head = require('head');
	var bs = require('../bootstrap/js/bootstrap.min');
	
	$('.check-all').on('change', function (e) {
		var checked = this.checked;
		$('.table-goods input:checkbox').prop('checked', checked);
		$('.check-all').prop('checked', checked);
	});

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

