var Util = {
	// 姓名验证
	nameOnly: function(str) {
		var regName = /((^[\u4E00-\u9FA5]{2,4}$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$))/;
		if (regName.test(str)) {
			return true;
		} else {
			return false;
		}
	},
	// 手机号码验证
	mobileOnly: function(str) {
		var regMobile = /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
		if (regMobile.test(str)) {
			return true;
		} else {
			return false;
		}
	},
	// 电子邮件验证
	emailOnly: function(str) {
		var regEmail = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
		if (regEmail.test(str)) {
			return true;
		} else {
			return false;
		}
	}
};

(function(win, doc, $) {
	var $win       = $(win),
		$chenkbox  = $('.chenkbox'),
		$wapCheck  = $('.wap_checkbox'),
		$scroll    = $("#j_scroll_list2"),
		$smallIcon = $(".small_icon"),
		$submit    = $('.btn_submit'),
		$img       = $('#ScrollImgBox2'),
		$wapSubmit = $('.wap_submit'),
		$form      = $('.formbox'),
		$wapForm   = $('.wap .formbox');

	var isPc = isWap = false;

	win.onload = win.onresize  = loadComplete;

	function loadComplete() {
		$win.width() < 1000 ? wapBindEvent() : pcBindEvent();
	}

	function pcBindEvent() {
		if (!isPc) {
			videoPlayer('100103700', 1000, 680, 'mod_player');
			$scroll.DY_scroll({img:'#ScrollImgBox2',or: true });
			$submit.on('click', formSubmit);
			$chenkbox.on('click', function() {
				checkboxFn($chenkbox, $(this));
			});

			$smallIcon.on('click', scrollFn);

			isPc = true;
			console.log('is pc');
		}
	}

	function wapBindEvent() {
		if (!isWap) {
			videoPlayer('100103700', '6.02rem', '3.78rem', 'wap_player');
			initSwiper();
			$wapSubmit.on('click', wapFormSubmit);
			$wapCheck.on('click', function() {
				checkboxFn($wapCheck, $(this));
			});

			isWap = true;
			console.log('is wap');
		}
	}

	function initSwiper() {
		var mySwiper = new Swiper('.swiper-container', {
			loop: true,
			autoplay: 3000,
			// 如果需要前进后退按钮
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			pagination: '.swiper-pagination',
			paginationClickable: true
		});
	}

	function videoPlayer(vid, width, height, modId) {
		var video  = new tvp.VideoInfo(),
			player = new tvp.Player();

		video.setChannelId(vid);
		player.create({
			width: width,
			height: height,
			video: video,
			type: 1,
			modId: modId,
			autoplay: true,
			flashWmode: 'transparent',
			vodFlashSkin: 'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf',
			pic: './images/pc_video_img.jpg'
		});
	}

	function scrollFn() {
		var self = $(this);
		var idx  = self.index();

		$img.find('li').each(function() {
			if ($(this).attr('data-click') == idx) {
				$img.prepend($(this));
			}
		});
	}

	function checkboxFn($dom, self) {
		$dom.removeClass('active');
		self.addClass('active');
	}

	function formSubmit() {
		var nameVal  = $form.find('#username').val(),
			phoneVal = $form.find('#phone').val(),
			modelVal = $form.find('#j_models').val(),
			provVal  = $form.find('#j_province').val(),
			cityVal  = $form.find('#j_city').val(),
			addrVal  = $form.find('#j_address').val();

		var checkboxVal;
		$chenkbox.each(function() {
			if ($(this).hasClass('active')) {
				checkboxVal = $(this).attr('data-type');
			}
		});

		if (nameVal.length === 0 || nameVal.replace(/\s/g, "") === "") {
			alert("请输入您的姓名");
			return false;
		} else if (!Util.nameOnly(nameVal)) {
			alert("请输入正确的姓名格式");
			return false;
		} else if (phoneVal.length === 0) {
			alert("请输入您的手机号码");
			return false;
		} else if (!Util.mobileOnly(phoneVal)) {
			alert("请输入正确的电话格式");
			return false;
		} else if (modelVal === '') {
			alert("请选择车型");
			return false;
		} else if (provVal === '') {
			alert("请选择省份");
			return false;
		} else if (cityVal === '') {
			alert("请选择城市");
			return false;
		} else if (addrVal === '') {
			alert("请选择经销商");
			return false;
		}

		alert('恭喜您，个人信息提交成功');
	}

	function wapFormSubmit() {
		var nameVal  = $wapForm.find('#wap_un').val(),
			phoneVal = $wapForm.find('#wap_phone').val(),
			modelVal = $wapForm.find('#wap_models').val(),
			provVal  = $wapForm.find('#wap_province').val(),
			cityVal  = $wapForm.find('#wap_city').val(),
			addrVal  = $wapForm.find('#wap_address').val();

		var checkVal;
		$wapCheck.each(function() {
			if ($(this).hasClass('active')) {
				checkVal = $(this).attr('data-type');
			}
		});

		if (nameVal.length == 0 || nameVal.replace(/\s/g, "") == "") {
			alert("请输入您的姓名");
			return false;
		} else if (!Util.nameOnly(nameVal)) {
			alert("请输入正确的姓名格式");
			return false;
		} else if (phoneVal.length == 0) {
			alert("请输入您的手机号码");
			return false;
		} else if (!Util.mobileOnly(phoneVal)) {
			alert("请输入正确的电话格式");
			return false;
		} else if (modelVal == '') {
			alert("请选择车型");
			return false;
		} else if (provVal == '') {
			alert("请选择省份");
			return false;
		} else if (cityVal == '') {
			alert("请选择城市");
			return false;
		} else if (addrVal == '') {
			alert("请选择经销商");
			return false;
		}

		alert('恭喜您，个人信息提交成功');
	}

})(window, document, jQuery);

$.fn.DY_scroll = function(settings) {
	var defaultSettings = {
		img: '#ScrollImgBox', //轮播区域
		tag: 'li', //轮播元素
		speed: 5, //滚动间隔时间
		or: false, //是否自动轮播
		lbtype: 'left', //向左left，向上up，
		row: 1 //容器存放数量，防止数量不够时轮播
	};
	settings = jQuery.extend(defaultSettings, settings);
	return this.each(
		function() {
			var adName = settings.img.toString();
			var wraper = jQuery(this);
			var prev = wraper.children(".btn_left");
			var next = wraper.children(".btn_right");

			var img = jQuery(settings.img);

			var w = img.find(settings.tag).outerWidth(true);
			var h = img.find(settings.tag).outerHeight(true);
			var s = settings.speed;
			if (img.find(settings.tag).length > settings.row) {
				next.click(function() {
					if (!img.is(":animated")) {
						if (settings.lbtype === 'up') {
							img.animate({
								'margin-top': -h
							}, function() {
								img.find(settings.tag).eq(0).appendTo(img);
								img.css({
									'margin-top': 0
								});
							});
						} else {
							var $li = img.find(settings.tag);
							img.animate({
								'margin-left': -w
							}, function() {
								img.find(settings.tag).eq(0).appendTo(img);
								img.css({
									'margin-left': 0
								});

								var idx = $li.eq(1).attr('data-click');
								next.attr('data-click', idx);
								prev.attr('data-click', idx);
							});
						}
					}
				});
				prev.click(function() {

					if (!img.is(":animated")) {
						if (settings.lbtype === 'up') {
							img.find(settings.tag + ':last').prependTo(img);
							img.css({
								'margin-top': -h
							});
							img.animate({
								'margin-top': 0
							});
						} else {
							var $li = img.find(settings.tag);

							img.find(settings.tag + ':last').prependTo(img);
							img.css({
								'margin-left': -w
							});
							img.animate({
								'margin-left': 0
							});
							var idx = $li.eq(2).attr('data-click');

							next.attr('data-click', idx);
							prev.attr('data-click', idx);
						}
					}
				});
				if (settings.or == true) {
					adName = setInterval(function() {
						next.click();
					}, s * 1000);
					wraper.hover(function() {
						clearInterval(adName);
					}, function() {
						adName = setInterval(function() {
							next.click();
						}, s * 1000);
					});
				}
			}
		}
	);
};