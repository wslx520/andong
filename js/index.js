define(function (require, exports, module) {
	var $ = require('lib/jquery');
	var XScroll = require('plugin/XScroll2');
	var xscroll = XScroll('banner-pics', 
		{auto:4000,how:1, direct:0,pager:'banner-pager'}
	);
	// console.log(xscroll);
	$('.nav.left').on('click', function () {
		xscroll.Prev();
	});
	$('.nav.right').on('click', function () {
		xscroll.Next();
	});
});

