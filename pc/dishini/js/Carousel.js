(function ($) {
	$.fn.carousel = function (t) {
		var $imgWrap = $(this).find('.img-wrap'),
			$liArr   = $(this).find('.img-wrap li'),
			$next    = $(this).find('.next'),
			$prev    = $(this).find('.prev'),
			$btns    = $(this).find('.footer-btn li'),
			count    = $(this).attr('data-count');
		
		var timer,
			t = t || 3000;
		var imgSize  = $liArr.length;
		var imgWidth = $liArr.width();
		$imgWrap.width(imgWidth * imgSize);
		$next.on('click', function () {
			playNext();
		});
		$prev.on('click', function () {
			playPrev();
		});
		function playNext () {
			$imgWrap.animate({
				'left': 0 - imgWidth
			}, function () {
				$(this).append($imgWrap.children().first());
				$(this).css('left', 0);
				count++;
				if (count === 4) {
					count = 0;
				}
				gotoPage(count);
			});
		}
		function playPrev () {
			$imgWrap.prepend($imgWrap.children().last());
			$imgWrap.css('left', 0 - imgWidth);
			$imgWrap.animate({'left': 0});
			--count;
			if (count === -4) {
				count = 0;
			}
			gotoPage(count);
		}
		function gotoPage (idx) {
			if (idx === -1) {
				idx = 3;
			} else if (idx === -2) {
				idx = 2;
			} else if (idx === -3) {
				idx = 1;
			}
			$btns.removeClass('active');
			$btns.eq(idx).addClass('active');
		}
	};
})(jQuery);