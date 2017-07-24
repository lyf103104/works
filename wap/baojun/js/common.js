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
	var $doc    = $(doc),
		$win    = $(win),
		winH    = $win.height(),
		$yysj   = $('.btn_yysj'),
		$submit = $('.btn_submit'),
		$form   = $('.formwrap'),
		bg4     = doc.querySelector('#bg4');

	win.onload = loadComplete;

	function loadComplete() {
		win.onscroll = scrollHandler;
		$yysj.on('click', goBottm);
		$submit.on('click', formSubmit);
	}

	function scrollHandler() {
		isHide() ? $yysj.fadeOut() : $yysj.fadeIn();
	}

	function isHide() {
		var scrollTop = $doc.scrollTop();
		var offsetTop = bg4.offsetTop;

		return scrollTop + winH > offsetTop ? true : false;
	}

	function goBottm() {
		var docH = $doc.height();
		var back_timer = setInterval(function() {
			var osTop  = $doc.scrollTop();
			var speed  = Math.floor(osTop + 80);

			$doc.scrollTop(speed);
			if (osTop == docH - winH) clearInterval(back_timer);
		}, 30);
	}

	function formSubmit() {
		var nameVal  = $form.find('#name').val(),
			phoneVal = $form.find('#phone').val(),
			provVal  = $form.find('#yy_province').val(),
			cityVal  = $form.find('#yy_city').val(),
			addrVal  = $form.find('#yy_address').val();

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