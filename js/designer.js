
define(function (require, exports, module) {
	var $ = window.jQuery = require('lib/jquery');
	var bs = require('../bootstrap/js/bootstrap.min');
	
	var viewList = [];
	var curIndex = 0;
	var $modal = $('#viewModal');
	$('#works').on('click', '.pics li', function (e) {
		var $li = $(this);
		var index = $li.index();
		curIndex = index;
		var list = $li.parent().attr('data-pics');
		viewList = list.split(',');
		// console.log(viewList, viewList.length);
		$modal.modal({show: true});

		$modal.find('.center-img img').prop('src', viewList[curIndex]);
		$modal.find('.center-info .name').text($li.parent().attr('data-name'));
		$modal.find('.pages .cur').text(curIndex + 1);
		$modal.find('.pages .total').text(viewList.length);
	});
	$modal.on('click', '.nav', function () {
		var nav = $(this);
		if (nav.hasClass('nav-left')) {
			curIndex -= 1;
		}
		else {
			curIndex += 1;
		}
		if (curIndex < 0) {
			curIndex = viewList.length - 1;
		}
		else if (curIndex >= viewList.length) {
			curIndex = 0;
		}
		$modal.find('.center-img img').prop('src', viewList[curIndex]);
		$modal.find('.pages .cur').text(curIndex + 1);
	})
});

