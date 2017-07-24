$(function(){
	/*滚动条*/
	$('.div_scroll').scroll_absolute({arrows:true});

	// 设置滚动条
	if ($('#scrollbar1 .overview li').length < 5) {
		$('#scrollbar1 .scrollbar').hide();
	} else {
		$('#scrollbar1 .track').height(520);
	}

	$('.activity_hjmd').click(function() {
		$('.hjmd-wrap').fadeIn();
	});

	$('.hjmd-wrap .close').click(function() {
		$('.hjmd-wrap').fadeOut();
	});

	// close qrcode layer
	$('.qrcode-wrap .close').click(function() {
		$('.qrcode-wrap').fadeOut();
	});

	// show qrcode layer
	$('.page_upload_btn').click(function() {
		$('.qrcode-wrap').fadeIn();
	});

	$('.upload_btn').click(function() {
		$('.qrcode-wrap').fadeIn();
	});

	// close activity layer
	$('.photo-layer .close').click(function() {
		$(this).parent().fadeOut();
	});

	// show activity layer
	$('.activity_des').click(function() {
		if ($(this).attr('data-type') == 1) {
			$('.photo-layer .privacy_policy').css('top', 900);
			$('#scrollbar2 .bc-text').attr('src', './images/photo-activity-txt.png');
		} else {
			$('.photo-layer .privacy_policy').css('top', 930);
			$('#scrollbar2 .bc-text').attr('src', './images/video-activity-txt.png')
		}
		$('.photo-layer').show();
		$('#scrollbar2').tinyscrollbar();
		$('#scrollbar2 .track').height(485);
	});
});