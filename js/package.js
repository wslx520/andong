define(function (require, exports, module) {
	var $ = require('lib/jquery');
	var XScroll = require('plugin/XScroll2');
	var xscroll = XScroll('banner-pics', 
		{auto:4000,how:1, direct:0,pager:'banner-pager', event: 'click'}
	);
	// console.log(xscroll);
	$('.nav.left').on('click', function () {
		xscroll.Prev();
	});
	$('.nav.right').on('click', function () {
		xscroll.Next();
	});

	$('#table-stuff').on('click', 'td', function (e) {
		var t = this.getAttribute('data-target');
		if (t) {
			$('.stuff').removeClass('on');
			$(t).addClass('on');
			$('#table-stuff td').removeClass('on');
			$(this).addClass('on');
		}
	})
});

