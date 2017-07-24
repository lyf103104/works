$(function() {
	var $photo = $('.grid-item .photo');
	var $img = $('.gallery .img-box img');

	Exposure.one($('.grid-page2 .photo'), function () {
		showImg($(this));
	});

	function showImg ($el) {
		$el.attr('src', $el.attr('data-original'));

		$('.grid').masonry({
			itemSelector: '.grid-item',
			columnWidth: 329,
			gutter: 5
		});
	}

	$photo.on('click', function() {
		var num = parseInt($(this).attr('data-count'));
		var obj = {'data-count': num };

		if (num == -1) {
			return false;
		}

		$('.layer .next-btn').attr(obj);
		$('.layer .prev-btn').attr(obj);

		$('.layer-container').show();

		var curtImg = $img.eq(num);
		var curtImgH = curtImg.height(),
			curtImgW = curtImg.width();

		if (curtImgH - curtImgW == 0) { // 正方形
			setCurtImgHeight();
		} else {
			if (curtImgW > curtImgH) {
				if (curtImgH / curtImgW > 0.66118837) {
					setCurtImgHeight();
				} else {
					setCurtImgWidth();
				}
			} else {
				setCurtImgHeight();
			}
		}

		$('.gallery').css({
			'left': -(num * 791)
		});

		function setCurtImgHeight() {
			curtImg.height(523);

			setTimeout(function() {
				curtImg.css({
					'marginLeft': (791 - curtImg.width())/2
				});
			}, 1);
		}

		function setCurtImgWidth() {
			curtImg.width(791);
			setTimeout(function() {
				curtImg.css({
					'marginTop': (523 - curtImg.height())/2
				});
			}, 1);
		}
	});

	$('.gallery').width($('.gallery li').length * 791);

	$('.layer .close').click(function(argument) {
		var obj = {'data-count': 0};

		$('.layer-container').hide();

		$('.layer .next-btn').attr(obj);
		$('.layer .prev-btn').attr(obj);
	});

	$('.layer .next-btn').click(next);

	function next() {
		var self = $(this);

		var num = parseInt(self.attr('data-count'));
		num++;

		if (num == $('.gallery li').length) {
			return alert("已经是最后一张");
		}
		self.off('click');

		var nextImg = $img.eq(num);
		var nextImgH = nextImg.height(),
			nextImgW = nextImg.width();

		if (nextImgH - nextImgW == 0) { // 正方形
			setNextImgHeight();
		} else {
			if (nextImgW > nextImgH) {
				if (nextImgH / nextImgW > 0.66118837) {
					setNextImgHeight();
				} else {
					setNextImgWidth();
				}
			} else {
				setNextImgHeight();
			}
		}

		var offset = parseInt($('.gallery').css('left'));

		$('.gallery').animate({
			"left": offset - 791
		}, 500, function() {
			self.on('click', next);
		});

		self.attr('data-count', num);
		$('.layer .prev-btn').attr('data-count', num);


		function setNextImgHeight() {
			nextImg.height(523);
			setTimeout(function(argument) {
				nextImg.css({
					'marginLeft': (791 - nextImg.width())/2
				});
			}, 1);
		}

		function setNextImgWidth() {
			nextImg.width(791);
			setTimeout(function(argument) {
				nextImg.css({
					'marginTop': (523 - nextImg.height())/2
				});
			});
		}
	}

	$('.layer .prev-btn').click(prev);

	function prev() {
		var self = $(this);

		var num = parseInt(self.attr('data-count'));
		num--;

		if (num == -1) {
			return alert("第一张图片");
		}
		self.off('click');

		var nextImg = $img.eq(num);
		var nextImgH = nextImg.height(),
			nextImgW = nextImg.width();

		if (nextImgH - nextImgW == 0) { // 正方形
			setNextImgHeight();
		} else {
			if (nextImgW > nextImgH) {
				if (nextImgH / nextImgW > 0.66118837) {
					setNextImgHeight();
				} else {
					setNextImgWidth();
				}
			} else {
				setNextImgHeight();
			}
		}

		var offset = parseInt($('.gallery').css('left'));

		$('.gallery').animate({
			"left": offset + 791
		}, 500, function() {
			self.on('click', prev);
		});

		self.attr('data-count', num);
		$('.layer .next-btn').attr('data-count', num);

		function setNextImgHeight() {
			nextImg.height(523);
			setTimeout(function(argument) {
				nextImg.css({
					'marginLeft': (791 - nextImg.width())/2
				});
			}, 1);
		}

		function setNextImgWidth() {
			nextImg.width(791);
			setTimeout(function(argument) {
				nextImg.css({
					'marginTop': (523 - nextImg.height())/2
				});
			});
		}
	}
});