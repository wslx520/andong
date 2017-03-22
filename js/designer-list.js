define(function (require, exports, module) {
	var $ = require('lib/jquery');
	var head = require('head');
    $('#loadmore').on('click', function () {
        $.get('data/more-designer.json').then(function (result) {
        	var data = result.data;
			var html = '';
			var list = data.dataList;
			console.log(list);
			for (var d = 0; d< list.length; d++) {
				var li = list[d];
				html += '\
                <li class="designer">\
					<div class="max-w">\
						<div class="desc">\
							<div class="photo">\
								<h2 class="name">舒曼 |  Summer</h2>\
								<span class="info">\
			        				<em class="zili">资历15年</em><em class="duty">设计总监</em>\
			        			</span>\
			        			<img src="images/designer-photo.jpg" alt="">\
							</div>\
							<div class="detail">\
			        			<p class="p">\
			        				香港室内设计协会执行委员成员，香港室内设计协会专业成员，麦麦廊创办人 （配饰服务）。近年被The Andrew Martin International Award选为全球50名国际著名室内设计师之一，是被“创意中国”评为近年中国三十位顶尖室内设计师中唯一的女性。\
			        			</p>\
			        			<button class="btn-yuyue">\
			        				<em>作品案例</em>\
			        				<i class="if i-pix-r"></i>\
			        			</button>\
							</div>\
						</div>\
					</div>\
				</li>';
			}
			$('#designer-ul').append(html);
		});

    })
});

