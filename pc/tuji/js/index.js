(function(window, $) {
	var inspect = {
		mobile: function(v) {
			var reg = /^1[3458]\d{9}$/;
			if(!(reg.test(v))) return false;
			return true;
		},
		email: function(v) {
			var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
			if(!(reg.test(v))) return false;
			return true;
		}
	};

	$(function() {
		createMarquee();
		$('input').placeholder();
		$('#carousel').carousel(3000);
		$('#scrollbar1').tinyscrollbar({size:291,sizethumb: 43});


		$('#mask').height($(window).height());

		var $nav  = $('.container .nav');

		$('.container .nav .item-1').mouseover(function() {
			$nav.css({'background-position': '0 0'});
		});
		$('.container .nav .item-2').mouseover(function() {
			$nav.css({'background-position': '0 -38px'});
		});
		$('.container .nav .item-3').mouseover(function() {
			$nav.css({'background-position': '0 -76px'});
		});

		var $pwd  = $('.container .register .reg .pwd');
		var $pwd2 = $('.container .register .reg .pwd-hide');

		$pwd.on('click', function() {
			$pwd.hide();
			$pwd2.show().focus();
		});

		$pwd2.on('blur', function() {
			if ($pwd2.val() == '') {
				$pwd2.hide();
				$pwd.show();
			}
		});

		$('.container .register .reg .reg-btn').click(function() {
			var name = $('.container .register .reg .email').val();
			var pwdLen  = $pwd2.val().length;

			if (!inspect.mobile(name) && !inspect.email(name)) {
				alert('请输入正确的手机号或邮箱');
				return;
			}

			if (pwdLen < 6 || pwdLen > 16) {
				alert('请输入正确的密码');
			}
		});

		$('.container .register .step-1 .checkbox').click(function() {
			var type = $(this).attr('data-type');

			if (type == 1) {
				$(this).css('background-position', '0 -14px');
				$(this).attr('data-type', '2');
			} else {
				$(this).css('background-position', '0 0');
				$(this).attr('data-type', '1');
			}
		});

		var $radios = $('.container .share-video .video-box li .tag');

		$radios.click(function() {
			var idx = $radios.index($(this));
			$radios.find('span').css('background-position', '0 -16px');
			$radios.eq(idx).find('span').css('background-position', '0 0')
		});

		function createMarquee() {
			$('.container .scroll-top .scorll-pro').animate({
				'top': -25
			}, 2000, function() {
				$(this).first().insertAfter($(this).last());
				$(this).css('top', 0);
				createMarquee();
			});
		}

		$('#panel span').click(function(argument) {
			$('#mask').hide();
			$('#panel').css({
				'top': -500,
				'marginTop': 0
			}).hide();
		})

		$('.container .nav .item-3').click(function(argument) {
			$('#mask').show();
			$('#panel').css({
				'top': '50%',
				'marginTop': -188
			}).show();
		})

		var dom = document.getElementById('rotate-img');
		var rotate = 0;
		setInterval(function() {
			var rotateStyle = 'rotate(' + rotate + 'deg)';
			
			dom.style.transform = rotateStyle;
			dom.style['-moz-transform']    = rotateStyle;
			dom.style['-webkit-transform'] = rotateStyle;
			dom.style['-o-transform']      = rotateStyle;
			dom.style['-ms-transform']     = rotateStyle;

			rotate += 3;
			if (rotate > 360) {rotate = 0}

		}, 30);

		var $videoPro = $(".container .share-video .video-box li img");

		$videoPro.click(function(){
			var video = new tvp.VideoInfo();
			video.setVid("v0128a0hvdj");
			var player = new tvp.Player();
			//视频调用
			player.create({
				width: 480,
				height: 360,
				video: video,
				modId: "mod_player2",
				autoplay: true,
				flashWmode:"transparent",//ie下解决视频遮挡问题
				vodFlashSkin:"http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf",//视频播放宽变窄
				isVodFlashShowSearchBar:false
			});
			//弹窗调用
			Dialog.showDiv("j_hopup_join");
			setTimeout(function () {
				$('#j_hopup_join .close_btn').show();

				$('.close_btn').on('click', function(){
					Dialog.close();
					player.pause();
				});
			}, 1000);
		});
		
		
		//弹窗调用
		var Dialog={
			showDiv:function(Dsobj,mask){
				if(Dsobj===null || Dsobj===undefined){alert("参数未定义！");return false;}
				if(mask==true||mask==undefined){Dialog.showMask();}
				jQuery(".layerbox").hide();
				$Dsobj=jQuery("#"+Dsobj);
				$Dsobj.stop();
				var wHeight = jQuery(parent.window).height();
				var scrollTop = jQuery(parent.window).scrollTop();
				var oHeight = $Dsobj.css("height").replace(/px/,'')/2
				var offsetHeight = wHeight/2+scrollTop - oHeight;
				if(offsetHeight < 0) offsetHeight = 0;
				var w = $Dsobj.css("width");	
				var marginleft = w.replace(/px/,'')/2;
				$Dsobj.addClass("layerbox");
				$Dsobj.css({"position":"absolute","left": "50%","z-index":"100","margin-left":-marginleft});
				
				$Dsobj.css("top",offsetHeight).show()
		
				jQuery('.close_btn').unbind();
				// jQuery('.close_btn').bind('click', function(){
				// 	Dialog.close();
				// 	player.pause();
				// })
				return false;
			},
			showMask : function(){
				var height = jQuery(document).height();
				jQuery("body").append("<div style='background:#000; display:none; filter:alpha(opacity=85);opacity: 0.85; z-index:99;  width:100%;  position:absolute; left:0; top:0;'  id='bgdiv'></div>");
				jQuery("#bgdiv").css("height",height);
				jQuery("#bgdiv").fadeIn();
			},
			close : function(){
				jQuery(".layerbox").hide()
				jQuery("#bgdiv").fadeOut(function(){jQuery("#bgdiv").remove();});
			}
		
		}
	});
})(window, jQuery);