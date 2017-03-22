define(function (require, exports, module) {
	var $ = require('lib/jquery');
	var head = require('head');


	var ScrollPin = require('plugin/ScrollPin');
    var scrollPin = new ScrollPin({
            pinner: $('#will-fixed'),
            // 不同尺寸的屏幕下，此高度可能不同
            boundary: $('#will-fixed').offset().top,
            scroller: window,
            ontoggle: function () {
                
            }
        });

    $('#will-fixed .tabs').on('click', 'a', function (e) {
    	$(this).addClass('on').siblings().removeClass('on');
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
	$('.thumbs-list').on('click', 'li img', function (e) {
		var img = $(this);
		var src = img.attr('data-big');
		img.closest('li').addClass('on').siblings().removeClass('on');
		// console.log(src);
		if (src) {
			$('.main-pic img').prop('src', src);
		}
	})
});

