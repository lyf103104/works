$(function() {
	var mobileOnly=function(str){
        var regMobile=/^0{0,1}(13[0-9]|14[0-9]|15[0-9]|18[0-9])[0-9]{8}$/;
        if (regMobile.test(str)){
            return true;
        } else {
            return false;
        }
    };
	var $slideItems = $('.scroll_pic .pic_list li');

	//图片预览
	new uploadPreview({ UpBtn: "up_img", DivShow: "imgdiv", ImgShow: "imgShow0"});
	new uploadPreview({ UpBtn: "reset_file", DivShow: "imgdiv", ImgShow: "imgShow0"});

	// 轮播
	$("#j_scroll_list").DY_scroll();
	$("#j_scroll_list2").DY_scroll({img:'#ScrollImgBox2',or: true });
	//视频播放
	var firstVid = $slideItems.first().attr('data-vid');
	videoPlayer(firstVid, '944', '504', 'mod_player', 'n', '1');
	// 轮播视频切换
	$slideItems.on('click', function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');

		var vid = $(this).attr('data-vid');
		videoPlayer(vid, '944', '504', 'mod_player', 'n', '1');
	});

	// 标签页切换iframe
	$('.xk_center .nav .item').click(function() {
		var self = $(this);
		if (self.hasClass('active')) return;

		var idx = self.index();
		idx++;

		$('#moduleIframe').attr({
			'src': './module_' + idx +'.html'
		});


		$('.xk_center .nav .item').removeClass('active');
		$(this).addClass('active');
	});
	// 上传协议
	$('.layer_preview .agree_box .fl').on('click', function() {
		var $parent = $(this).parent();
		var type = $parent.attr('data-type');

		if (type == 1) {
			$parent.attr('data-type', 0).css({
				'background-position': '0 -16px'
			});
		} else {
			$parent.attr('data-type', 1).css({
				'background-position': '0 0'
			});
		}
	});

	//上传提交
	$('.layer_preview .btns .submit').on('click', function() {
		if ($('.layer_preview .agree_box').attr('data-type') == 0) {
			return alert("请勾选上传协议");
		}
		$('.layer_preview').hide();
		$('.upload_sucs').show();
		$('.preview_box').attr('alg', 0);
		removeUpload();
	});

	// 重新上传
	// $('.layer_preview .btns .reset').on('click', function() {
	// 	Dialog.close();
	// });

	// 下拉菜单
	$("p.choice").click(function() {
		var _len = $(this).next().find("li").length;
		if (_len == 0) return false;
		else {
			$(this).next().show();
			$(this).parents("div.row").css("z-index", "99");
		}
	});
	$("div.fakeselect").mouseleave(function() {
		$(this).find("ul").hide();
		$(this).parents("div.row").css("z-index", "3");
	});

	// 勾选
	$('.form_wrap .selected').click(function() {
		var type = $(this).attr('data-type');

		if(type == 1){
			$(this).attr('data-type', 0).css({
				'background-position': '0 -15px'
			});
		} else {
			$(this).attr('data-type', 1).css({
				'background-position': '0 0'
			});
		}
	});

	// 预约试驾提交
	$('.xk_btm .form_wrap .btn_submit').click(function() {
		var name  = $('#username').val();
		var phone = $('#phone').val();
		var province = $('#j_pro').val();
		var cityed = $('#j_city').val();
		var time = $('#j_time').val();
		var series = $('#series').val();

		if(name.length == 0 || name.replace(/\s/g, "")==""){
            alert("请输入您的姓名");
            return false;
        }else if(phone.length == 0){
            alert("请输入您的手机号码");
            return false;
        }else if(!mobileOnly(phone)){
            alert("请输入正确的电话格式");
            return false;
        } else if(province==""){
            alert("请选择您所在的省份");
            return false;
        }else if(cityed==""){
            alert("请选择您所在的城市");
            return false;
        }else if(series==""){
            alert("请选择专营店");
            return false;
        }else if(time==""){
            alert("请选择预计购车时间");
            return false;
        } else if ($('.form_wrap .selected').attr('data-type') == 0) {
        	alert("请勾选条款");
            return false;
        }

  		Dialog.showDiv('yu_success');
	});

	$('.xk_btm .btn_des').hover(function() {
		$(this).find('.last').show();
		$(this).find('.first').hide();
	}, function() {
		$(this).find('.last').hide();
		$(this).find('.first').show();
	});

	$('.xk_btm .form_wrap .btn_submit').hover(function() {
		$(this).find('.last').show();
		$(this).find('.first').hide();
	}, function() {
		$(this).find('.last').hide();
		$(this).find('.first').show();
	});

	// 查看更多
	$('.xk_center .viewmore').click(function() {
		Dialog.showDiv("viewmore_layer");
		$('#scrollbar1').tinyscrollbar();
		$('#viewmore_layer').attr('data-type', 1);
	});

	// 输入QQ号
	$('.xk_center .wrap .input_wrap .des').click(function() {
		var self = $(this);

		self.hide();
		self.siblings('input').focus();
	});

	$('.xk_center .wrap .input_wrap input').blur(function() {
		if ($(this).val() == '') {
			$(this).siblings('.des').show();
		}
	});

	$('.xk_center .wrap .input_wrap .icon').click(function() {
		var reg = new RegExp("^[0-9]*$");
		var val = $(this).siblings('input').val();

		if (val == '' || val.length < 6) {
			alert("请输入正确的QQ号码!");
			return;
		}

		if(!reg.test(val)){
			alert("请输入数字!");
			return;
		}
 	});

 	$('.agree_box a').click(function() {
 		Dialog.close('#layer_preview');
 		Dialog.showDiv("viewmore_layer");
 		$('#scrollbar1').tinyscrollbar();
 		$('#viewmore_layer').attr('data-type', 2);
 	});

 	$('.viewmore_layer .closePop2').click(function() {
 		Dialog.close('#viewmore_layer');
 		if ($(this).parent().attr('data-type')  == 2) {
 			Dialog.showDiv('layer_preview');
 		}
 	});

 	// 预留信息from toggle
 	$('.upload_sucs .toggle').on('click', function() {
 		var self = $(this);

 		if (self.attr('data-click') == 0) {
 			self.attr('data-click', 1).css('background-position', '0 -22px');
 			$('.upload_sucs .formbox').show();
 			$('.upload_sucs .toggle .arr_1').hide();
 			$('.upload_sucs .toggle .arr_2').show();
 			clearInterval(timer1);
 			timer2 = setInterval(arrAnimate2, 30);
 			$('.upload_sucs').css('marginTop', '-214px');
 		} else {
 			self.attr('data-click', 0).css('background-position', '0 0');
 			$('.upload_sucs .formbox').hide();
 			$('.upload_sucs .toggle .arr_1').show();
 			$('.upload_sucs .toggle .arr_2').hide();
 			clearInterval(timer2);
 			timer1 = setInterval(arrAnimate, 30);
 			$('.upload_sucs').css('marginTop', '-111px');
 		}
 	});

 	// 预留信息提交
 	$('.upload_sucs .info_submit').on('click', function() {
 		var name  = $('#un2').val();
 		var phone = $('#phone2').val();
 		var addrs = $('#addrs').val();

 		if(name.length == 0 || name.replace(/\s/g, "")==""){
            alert("请输入您的姓名");
            return false;
 		} else if(phone.length == 0){
            alert("请输入您的手机号码");
            return false;
        } else if(!mobileOnly(phone)){
            alert("请输入正确的电话格式");
            return false;
        }  else if (addrs == '' || /[a-zA-Z0-9]/.test(addrs) ) {
        	alert("请输入正确的联系地址");
            return false;
 		}

 		$('.upload_sucs').hide();
 		Dialog.close();

 		Dialog.showDiv('yu_success');
 	});
 	var timer1 = null;
 	var timer2 = null;
 	// 箭头效果
 	function arrAnimate() {
 		$('.upload_sucs .toggle .arr_1').animate({
	 		"top": 8,
	 		"opacity": 0
	 	}, 1000, function() {
	 		$(this).fadeOut().css({
	 			'top': 0,
	 			"opacity": 1
	 		})
	 	});
 	}
 	function arrAnimate2() {
 		$('.upload_sucs .toggle .arr_2').animate({
	 		"top": 0,
	 		"opacity": 0
	 	}, 1000, function() {
	 		$(this).fadeOut().css({
	 			'top': 6,
	 			"opacity": 1
	 		})
	 	});
 	}

 	timer1 = setInterval(arrAnimate, 30);

 	$('.upload_sucs .group .addrs_div span').on('click', function() {
 		$(this).hide();
 		$(this).siblings().focus();
 	});

	$('.upload_sucs .group .addrs_div input').on('blur', function() {
		if ($(this).val() == '') {
			$(this).siblings().show();
		}
	});
});

function removeUpload(){
	$("#imgdiv").attr("alg","").html('<img id="imgShow0" class="ingShow" src="">');
	$("#up_img").remove();
	$("#uploader_box").append('<input type="file" id="up_img" class="file" accept="image/gif,image/jpeg,image/jpg,image/png" />');
	new uploadPreview({ UpBtn: "up_img", DivShow: "imgdiv", ImgShow: "imgShow0"});
	$("#reset_file").remove();
	$("#re_upload").append('<input type="file" id="reset_file" accept="image/gif,image/jpeg,image/jpg,image/png">');
	new uploadPreview({ UpBtn: "reset_file", DivShow: "imgdiv", ImgShow: "imgShow0"});
}

function onQQVideoAllEnded(){
	//var firstVid = $('.scroll_pic li.active').attr('data-vid');
	//videoPlayer(firstVid, '944', '504', 'mod_player', 'n', '1');
}

// 轮播
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
							img.animate({
								'margin-left': -w
							}, function() {
								img.find(settings.tag).eq(0).appendTo(img);
								img.css({
									'margin-left': 0
								});
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
							img.find(settings.tag + ':last').prependTo(img);
							img.css({
								'margin-left': -w
							});
							img.animate({
								'margin-left': 0
							});
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

// 弹层
var Dialog={
	showDiv: function(Dsobj, mask) {
		if (Dsobj === null || Dsobj === undefined) {
			alert("参数未定义！");
			return false;
		}
		if (mask == true || mask == undefined) {
			Dialog.showMask();
		}
		jQuery(".layerbox").hide();
		$Dsobj = jQuery("#" + Dsobj);
		$Dsobj.stop();
		var wHeight = jQuery(parent.window).height();
		var scrollTop = jQuery(parent.window).scrollTop();
		var oHeight = $Dsobj.css("height").replace(/px/, '') / 2
		var offsetHeight = wHeight / 2 + scrollTop - oHeight;
		if (offsetHeight < 0) offsetHeight = 0;
		var w = $Dsobj.css("width");
		var marginleft = w.replace(/px/, '') / 2;
		$Dsobj.addClass("layerbox");
		$Dsobj.css({
			"position": "absolute",
			"left": "50%",
			"z-index": "100",
			"margin-left": -marginleft
		});
		$Dsobj.css("top", offsetHeight).show()
		jQuery('.closePop').unbind();
		jQuery('.closePop').bind('click', function() {
			Dialog.close();
		})
		$('.layer_preview .closePop').on('click', function() {
			$("#up_img").remove();
			$("#uploader_box").append('<input type="file" id="up_img" class="file" accept="image/gif,image/jpeg,image/jpg,image/png" />');
			new uploadPreview({ UpBtn: "up_img", DivShow: "imgdiv", ImgShow: "imgShow0"});
		});
		jQuery('.upload_sucs .closePop').bind('click', function() {
			$(this).parent().hide();
		})

		switch (Dsobj) {}

		Dialog.preDsobj = Dsobj;
		return false;
	},
	//背景层
	showMask: function() {
		var height = jQuery(document).height();
		jQuery("body").append("<div style='background:#000; display:none; filter:alpha(opacity=60);opacity: 0.6; z-index:90;  width:100%;position:absolute; left:0; top:0;'  id='bgdiv'></div>");
		jQuery("#bgdiv").css("height", height);
		jQuery("#bgdiv").fadeIn();
	},
	//关闭
	close: function() {
		$(".layerbox").hide()
		$("#bgdiv").remove();
	}
};