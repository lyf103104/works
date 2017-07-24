(function(window, $) {
	$(function() {
		var winH = $(window).height();
		var winW = $(window).width();

		var $mainWrap = $('.main-wrap'),
			$videoBox = $('.main-wrap .video-box'),
			$tempBox  = $('.main-wrap .temp-box');

		var videoWidth, videoHeight;

		var topH    = $('.top-container').height(),
			footerH = $('.footer-container').height(),
			logoTop = $('.top-container .logo').css('marginTop');

		computeMainHeigth();

		if (winW < 1201) {
			setVideoBoxWH(winW);
		} else {
			setVideoBoxWH(1200);
		}

		computeVideo();
		$('.bc-box').css({
			'top': ($(window).height() - 434)/2,
			'left': ($(window).width() - 709)/2
		});

		$(window).resize(function() {
			winH = $(window).height();
			winW = $(window).width();
			if (winW < 1001) {
				winW = 1000;
			}
			computeMainHeigth();
			if (winW > 1000 && winW < 1201) {
				setVideoBoxWH(winW);
			} else if (winW < 1001) {
				setVideoBoxWH(1000);
			}

			computeVideo();

			$('.bc-box').css({
				'top': ($(window).height() - 434)/2,
				'left': ($(window).width() - 709)/2
			});
		});

		// 计算 main-container 高度
		function computeMainHeigth() {
			// var mainH   = winH - topH - parseInt(logoTop);
			$('.main-container').height(winH);
		}

		function setVideoBoxWH(basic) {
			$mainWrap.width(basic);

			var videoBoxWidth  = basic*0.64;
			var videoBoxHeight = videoBoxWidth * 0.5625;
			var tempBoxWidth   = basic - videoBoxWidth;

			// 设置视频容器的宽、高
			$videoBox.width(videoBoxWidth);
			$videoBox.height(videoBoxHeight);

			videoHeight = videoBoxHeight;

			$tempBox.width(tempBoxWidth);
			$tempBox.height(tempBoxWidth);

			var $temp = $tempBox.find('.temp');

			var tempHeight = $temp.height();
			var tempWidth  = $temp.width();

			$temp.css({
				'top': (tempBoxWidth-tempHeight) / 2,
				'left': (tempBoxWidth-tempWidth) / 2
			});
		}
		
		function computeVideo() {
			var mainWrapW = $mainWrap.width();

			var mainWrapTop  = (winH-topH-parseInt(logoTop))/2 - videoHeight/2.2,
				mainWrapLeft = (winW - mainWrapW) / 2;

			$mainWrap.css({
				'top': mainWrapTop,
				'left': mainWrapLeft
			});
		}

		$('#box1 .agreebox,#box2 .agreebox').click(function(ev) {			
			var name = ev.target.nodeName;

			if (name == 'A') {

			} else {

				if ( $(this).attr('data-type') == '1' ) {
					$(this).find('span').css('background-position', '0 -21px');
					$(this).attr('data-type', '0');
				} else {
					$(this).find('span').css('background-position', '0 0');
					$(this).attr('data-type', '1');
				}
			}
		});

		$('#btn').click(function() {
			$('input').val('');
			layerShow();
		});
		$('#btn2,#btn3').click(function() {
			$('input').val('');
			layerShow2();
		});

		$('.signup-contaner').click(function() {
			layerShow();
		});

		$('.bc-box .close').click(function() {
			$('.float-layer').fadeOut();
			$('.bc-box').fadeOut();
		});

		function layerShow() {
			$('.float-layer').fadeIn();
			$('.bc-box2').fadeIn();
		}
		function layerShow2() {
			$('.float-layer').fadeIn();
			$('.bc-box').fadeIn();
		}
	});
})(window, jQuery);