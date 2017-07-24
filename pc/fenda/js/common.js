$(function() {
	var win = $(window);

	$('.main').height(win.height());

	$('.main .qq_icon').hover(function() {
		$('.qrcode').show();
	},function() {
		$('.qrcode').hide();
	});

	$('.main .text').animate({
		'top': 200
	}, 300, function() {
		$(this).animate({
			'top': 130
		}, 500, 'easeOutBounce');
	});

	$('.video_list .item').click(function() {
		var index = $(this).index();
		var vid   = $(this).attr('data-vid');
		$('.video_box img').css('visibility', 'hidden');
		$('.video_list .item img').each(function(idx) {
			idx++;
			$(this).attr('src', './images/video'+idx+'.png');
		});

		index++;
		$(this).find('img').attr('src', './images/video'+index+'_curt.png');
		videoPlayer('video_player', vid, '555', '323', 1, '2');
	});

	$('.video_box img').click(function() {
		var vid = $('.video_list .item').first().attr('data-vid');
		videoPlayer('video_player', vid, '555', '323', 1, '2');
		$(this).hide().next().show();
	});

	function videoPlayer(id, vid, width, height, autoplay, type) {
		h5e.video.init({
			modId: id,
			vid: vid,
			width: width,
			height: height,
			autoplay: autoplay,
			type: type,
			flashWmode: 'transparent',
			vodFlashSkin: 'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf'
		});
	}

	setInterval(btnAnimate, 3000);
	function btnAnimate() {
		var self = $('.main .btn_go');

		self.animate({
			"top": 219
		}, 200, function() {
			self.animate({
				"top": 225
			}, 200, function() {
				self.animate({
					"top": 222
				}, 200, function() {
					self.animate({
						"top": 225
					}, 200, function() {
						self.animate({
							"top": 224
						}, 200, function() {
							self.animate({
								"top": 224
							}, 200);
						});
					});
				});
			});
		});
	}

});