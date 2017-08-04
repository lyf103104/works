$(function() {
	var offset  = $(window).height()/5;
	var $shut   = $('.shut');
	var $vidImg = $('.video_img');
	var vid     = document.querySelector('#video');

	$vidImg.on('click', vidPlayer);
	$shut.on('click', closeVid);
	vid.addEventListener('ended', vidEnded, false);
	new WOW({
	    boxClass: 'wow',
	    animateClass: 'animated',
	    offset: offset,
	    mobile: true,
	    live: true
	}).init();

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
});
