define(function (require, exports, module) {
	var $ = require('lib/jquery');
	var ScrollPin = require('plugin/ScrollPin');
    var scrollPin = new ScrollPin({
            pinner: $('#will-fixed'),
            // 不同尺寸的屏幕下，此高度可能不同
            boundary: $('#will-fixed').offset().top,
            scroller: window,
            ontoggle: function () {
                
            }
        });
});

