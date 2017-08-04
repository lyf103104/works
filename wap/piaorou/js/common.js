$(main)
function main() {
	var $pyramidBg    = $('.pyramid')
	var $vidBox       = $('.video_box')
	var $pyramidLy    = $pyramidBg.find('.pyramid_layer')
	var $pyramidItems = $pyramidBg.find('.item')
	var $shut         = $('.shut')
	var $vidImg       = $('.video_img')
	var vid           = document.querySelector('#video')
	var winHeiget     = $(window).height()
	var $hdbj = $('.hdbj');
	var $hdld = $('.hdld');
	var $hdcy = $('.hdcy');
	var $hdsj = $('.hdsj');
	var $layer_phone = $('.layer_phone');
	var hdbjTop = $hdbj.offset().top;
	var hdldTop = $hdld.offset().top;
	var hdcyTop = $hdcy.offset().top;
	var hdsjTop = $hdsj.offset().top;
	var pyramidTop = $pyramidBg.offset().top;
	var layerphoneTop = $layer_phone.offset().top;

	forHDAnimation();
	$vidImg.on('click', vidPlayer);
	$shut.on('click', closeVid);
	vid.addEventListener('ended', vidEnded, false);
	$(window).scroll(forHDAnimation);

	new WOW({
	    boxClass: 'wow',
	    animateClass: 'animated',
	    offset: winHeiget/3,
	    mobile: true,
	    live: true
	}).init();

	function forHDAnimation() {
		hdAnimation($hdbj, hdbjTop);
		hdAnimation($hdld, hdldTop);
		hdAnimation($hdcy, hdcyTop);
		hdAnimation($hdsj, hdsjTop);
		hdAnimation($pyramidBg, pyramidTop);
		hdAnimation($layer_phone, layerphoneTop);
	}

	function vidPlayer() {
		vid.style.display = 'block';
		vid.play();
		$shut.show();
	}

	function closeVid() {
		$shut.hide();
		vid.style.display = 'none';
		vid.pause();
	}

	function vidEnded() {
		$shut.hide();
		vid.style.display = 'none';
	}

	function hdAnimation(target, targetTop) {
		let scrollTop = $(window).scrollTop();
		if (targetTop-scrollTop < winHeiget-target.height()) {
			if (target.hasClass('pyramid')) {
				$('.pyramid_3').addClass('animated fadeInDown');
				setTimeout(function() {
					$('.pyramid_2').addClass('animated fadeInDown');
				}, 3e2)
				setTimeout(function() {
					$('.pyramid_1').addClass('animated fadeInDown');
					$('.pyramid_shadow').fadeIn(1e3, function() {
						target.find('.item1').animate({
							opacity: 1
						}, 400, function() {
							target.find('.item2').animate({
								opacity: 1
							}, 400, function() {
								target.find('.item3').animate({
									opacity: 1
								}, 400)
							});
						});
					});
				}, 7e2)
			} else {
				// target.addClass('hd_at');
			}
		}
	}
}


function log(str){
	return console.log(str)
}