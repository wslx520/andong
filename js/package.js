define(function (require, exports, module) {
	var $ = require('lib/jquery');
	var head = require('head');
    var bs = require('../bootstrap/js/bootstrap.min');


    var ScrollPin = require('plugin/ScrollPin');
    var scrollPin = new ScrollPin({
            pinner: $('#will-fixed'),
            // 不同尺寸的屏幕下，此高度可能不同
            boundary: $('#will-fixed').offset().top,
            scroller: window,
            ontoggle: function () {
                
            }
        });
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
			$('.stuff.on').removeClass('on');
			$(t).addClass('on');
			$('#table-stuff td.on').removeClass('on');
			$(this).addClass('on');
		}
	})
});

