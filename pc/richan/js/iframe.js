$(function() {
	// 点赞
	$('.waterfall_container').on('click', '.r_title img',function() {
		var flag = $(this).attr('data-flag');
		if (flag == 1) {
			return;
		} else {
			$(this).attr({
				'data-flag': 1,
				'src': './images/heart_s.png'
			});

			var $count = $(this).siblings('span');
			var n = parseInt($count.text());
			n++;
			$count.text(n);
			
		}
	});
});