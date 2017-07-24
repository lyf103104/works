//姓名验证
var nameOnly=function(str){
	var regName=/((^[\u4E00-\u9FA5]{2,4}$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$))/;
	if (regName.test(str)){
		return true;
	} else {
		return false;
	}
}
//手机号码验证
var mobileOnly=function(str){
	var regMobile=/^0{0,1}(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
	if (regMobile.test(str)){
		return true;
	} else {
		return false;
	}
}

$(function() {
	initSwiper();
	function initSwiper() {
		new Swiper('.swiperbox1 .swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        nextButton: '.swiperbox1 .swiper-button-next',
	        prevButton: '.swiperbox1 .swiper-button-prev',
	        spaceBetween: 30,
	        hashnav: true,
	        hashnavWatchState: true,
			loop: true
	    });
		new Swiper('.swiperbox3 .swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        nextButton: '.swiperbox3 .swiper-button-next',
	        prevButton: '.swiperbox3 .swiper-button-prev',
	        spaceBetween: 30,
	        hashnav: true,
	        hashnavWatchState: true,
			loop: true
	    });
	    $('.swiperbox3').hide();
	}

	$('.player_box').on('touchend', function() {
		var video = new tvp.VideoInfo();
		video.setVid("i001216370f");

		var player = new tvp.Player();
		player.create({
			width: "100%",
			height: "3.64rem",
			video: video,
			modId: "mod_player", //mod_player是刚刚在页面添加的div容器
			autoplay:true
		});
	});

    $('.main .tab').on('touchend', 'span', function() {
    	var self = $(this);
    	var idx = self.index();
    	var $contBoxs = $('.swiperbox');
    	var pos = '';

    	$contBoxs.hide();
    	$contBoxs.eq(idx).show();

    	if (idx == 0) {
    		pos = 1;
    	} else if (idx == 1) {
    		pos = 2;
    	} else if (idx == 2) {
    		pos = 3;
    	}

    	self.parent().css('background-image', "url(./images/tab_"+ pos +".png)");
    });

    $('.main .btn_submit').on('touchend', function() {
    	if ($('#yy_car1').val() == '') {
    		alert('请选择车型');
    		return false;
    	} else if ($('#yy_car2').val() == '') {
    		alert('请选择车款');
    		return false;
    	} else if ($('#yy_province').val() == '') {
    		alert('请选择省份');
    		return false;
    	} else if ($('#yy_city').val() == '') {
    		alert('请选择城市');
    		return false;
    	} else if ($('#yy_address').val() == '') {
    		alert('请选择经销商');
    		return false;
    	} else if ($('#un').val() == '') {
    		alert('请填写姓名');
    		return false;
    	} else if ($('#phone').val() == '') {
    		alert('请填写电话');
    		return false;
    	} else if(!mobileOnly($('#phone').val())) {
			alert("请输入正确的电话格式");
	        return false;
		} else if(!nameOnly($('#un').val())){
			alert("请输入正确的姓名格式");
	        return false;
		}

		alert("提交成功");
    });
});