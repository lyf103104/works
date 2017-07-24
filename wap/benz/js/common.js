// 姓名验证
var nameOnly=function(str){
	var regName=/((^[\u4E00-\u9FA5]{2,4}$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$))/;
	if (regName.test(str)){
		return true;
	} else {
		return false;
	}
};
// 手机号码验证
var mobileOnly=function(str){
	var regMobile=/^0{0,1}(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
	if (regMobile.test(str)){
		return true;
	} else {
		return false;
	}
};
// 电子邮件验证
var emailOnly=function(str){
	var regEmail=/[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
	if (regEmail.test(str)){
		return true;
	} else {
		return false;
	}
};

$(function() {
	// init fullpage
	$('#dowebok').fullpage({
		sectionsColor: ['#000', '#ffea00', '#ffea00', '#ffea00', '#ffea00'],
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5']
	});

	setInterval(arrowSlideFun, 1001);
	// arrow slide handler
	function arrowSlideFun() {
		$('.arr_down').animate({
			'bottom': '0.74rem',
			'opacity': 0
		}, 1000, function() {
			$(this).css({
				'bottom': '0.85rem',
				'opacity': 1
			});
		});
	}

	var dom    = document.querySelector('#rotate');
	var rotate = 0;
	rotateHandler();
	// page1 ringbtn rotate handler
	function rotateHandler() {
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
	}
	// page2 user infomation verify
    $('.bc_2 .formbox .btn_submit').on('touchend', function() {
		var name     = $('#un').val(),
			phone    = $('#phone').val(),
			email    = $('#email').val(),
			sex      = $('#sex').val(),
			province = $('#yy_province').val(),
			city     = $('#yy_city').val(),
			address  = $('#yy_address').val(),
			buydate  = $('#buydate').val();

		if (name == '' || name.replace(/\s/g, "") == "") {
			alert("请输入您的姓名");
			return false;
		} else if (!nameOnly(name)) {
			alert("请输入正确的姓名格式");
			return false;
		} else if (phone == '') {
			alert("请输入您的手机号码");
			return false;
		} else if (!mobileOnly(phone)) {
			alert("请输入正确的电话格式");
			return false;
		} else if (email == '') {
			alert("请输入您的邮箱");
			return false;
		} else if (!emailOnly(email)) {
			alert("请输入正确的邮箱格式");
			return false;
		} else if (province == "") {
			alert("请选择您所在的省份");
			return false;
		} else if (city == "") {
			alert("请选择您所在的城市");
			return false;
		} else if (address == "") {
			alert("请选择经销商");
			return false;
		} else if (buydate == "") {
			alert("请选择预计购车时间");
			return false;
		}
		console.log(name, phone, email, sex, province, city, address, buydate);
    });

    // page4 video init
    $('.player_box').on('touchend', function() {
		var video = new tvp.VideoInfo();
		video.setVid("i001216370f");

		var player = new tvp.Player();
		player.create({
			width: "6.34rem",
			height: "4rem",
			video: video,
			modId: "mod_player", //mod_player是刚刚在页面添加的div容器
			autoplay:true
		});
	});
});