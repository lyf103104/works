// 首页顶部视频播放
$('.video_list .curt-player').on('click', function() {
	var source = $(this).attr('data-source');
	videoPlayer('video_player', source, '714', '479', 1, '2');
	$("#video_player").show().next().hide();
});
$('.video_img').click(function() {
	videoPlayer('video_player', 'i001216370f', '714', '479', 1, '2');
	$(this).hide().prev().show();
});
// 首页尾部 && 视频二级页视频播放
$('.full-video').on('click', function() {
	$("#video_player").html('<img src="images/video_img.jpg" alt="" />');

	videoPlayer('mod_player2', 'i001216370f', '776', '523', 1, '2');
	$('.videoplayer-layer').show();
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

// video layer close
// $('.videoplayer-layer .bc').click(function() {
// 	videoLayerHide();
// });
$('.videoplayer-layer .close').click(function() {
	videoLayerHide();
});

function videoLayerHide() {
	$("#mod_player2").html('');
	$('.videoplayer-layer').hide();
}