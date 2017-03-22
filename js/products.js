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
    $('#loadmore').on('click', function () {
        $.get('data/more.json').then(function (result) {
        	var data = result.data;
			var html = '';
			var list = data.dataList;
			console.log(list);
			for (var d = 0; d< list.length; d++) {
				var li = list[d];
				html += '\
                <li>\
                      <div class="pro">\
                          <img src="' + li.pic + '" alt="' + li.name + '">\
                          <span class="name">' + li.name + '</span>\
                          <span class="price">￥' + li.price + '</span>\
                          <span class="service">免费配送</span>\
                          <span class="box">\
                          	<a href="#" class="todetail"><em class="txt">' + li.desc + '</em></a>\
                          	<span class="icons">\
                          		<i class="if i-share"></i>\
								<i class="if i-cart"></i>\
								<i class="if i-share"></i>\
                          	</span>\
                          </span>\
                      </div>\
                </li>';
			}
			$('#product-ul').append(html);
		});

    })
});

