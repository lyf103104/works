$(function() {
	loadData()
});
var _isdataNull = false;
var count = 0;

// 加载瀑布流
function loadData() {
	//初次执行，默认拉取第一页数据
	$('#waterfall_container').append(loadHtmlData(1));
	$('#waterfall_container').waterfall({
		auto_imgHeight: false,
		getResource: function(pageIndex, render) {
			return loadHtmlData(pageIndex);
		}
	});
}

// 拉取数据
function loadHtmlData(pageIndex) {
	if (pageIndex >= 6) {
		_isdataNull = true;
		// $('.waterfall_loading').html('没有数据!');
		return "";
	}

	var _strHtml = '';

	for (var i = 0; i < 6; i++) {
		var src = './images/flow-' + (i % 4 + 1) + '.jpg';
		var txt = '这个春天我最萌';
		var praise = 134545;

		var w = '',
			h = '';

		if (i % 4 == 0) {
			w = 791;
			h = 523;
		} else if (i % 4 == 1) {
			w = 692;
			h = 392;
		} else if (i % 4 == 2) {
			w = 540;
			h = 456;
		} else if (i % 4 == 3) {
			w = 375;
			h = 453;
		}

		_strHtml += '<div class="base_area grid-item">' +
			'<div class="pic_show">' +
			'<img class="photo" count="' + count + '" src="' + src + '" w="' + w + '" h="' + h + '" />' +
			'</div>' +
			'<div class="info">' +
			'<h5 class="title item">' + txt + '</h5>' +
			'<div class="praise item">' +
			'<span>' + praise + '</span>' +
			'</div>' +
			'</div>' +
			'</div>';
		count++;
	}
	return _strHtml;
}

$(window).on('scroll', function() {
	if (!_isdataNull) $.onScroll();
});

$('#waterfall_container').on('click', '.grid-item .photo', function() {
	var count = $(this).attr('count');
	var obj   = {'data-count': count };

	$('.layer .next-btn').attr(obj);
	$('.layer .prev-btn').attr(obj);

	var src  = $(this).attr('src');
	var txt1 = $(this).parents('.base_area').find('.title').text();
	var txt2 = $(this).parents('.base_area').find('.praise span').text();

	var self = $('.layer-container .img-box img');

	self.attr('src', src);
	$('.layer-container .title').text(txt1);
	$('.layer-container .praise span').text(txt2);

	var curtImgH = $(this).attr('h'),
		curtImgW = $(this).attr('w');

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

	$('.layer-container').show();

	function setCurtImgHeight() {
		self.height(523);
		self.width('auto');

		setTimeout(function() {
			self.css({
				'marginTop': 0,
				'marginLeft': (791 - self.width()) / 2
			});
		}, 10);
	}

	function setCurtImgWidth() {
		self.width(791);
		self.height('auto');
		setTimeout(function() {
			self.css({
				'marginLeft': 0,
				'marginTop': (523 - self.height()) / 2
			});
		}, 10);
	}

});

$('.layer .next-btn').click(next);

function next() {
	var self = $(this);
	var num = parseInt(self.attr('data-count'));
	num++;

	var $img = $('#waterfall_container').find('.grid-item .photo');

	if (num == $img.length) {
		return alert("已经是最后一张");
	}
	self.off('click');

	var nextImg = $img.eq(num);
	var nsrc = nextImg.attr('src');
	var txt  = nextImg.parents('.base_area').find('.title').text();
	var zan  = nextImg.parents('.base_area').find('.praise span').text();
	var tmp  = $(
		'<li>' +
			'<div class="img-box">' +
				'<img class="" src="' + nsrc + '">' +
			'</div>' +
			'<div class="info">' +
				'<h5 class="title item">' + txt + '</h5>' +
				'<div class="praise item">' +
					'<span>' + zan + '</span>' +
				'</div>' +
			'</div>' +
		'</li>'
	);

	$('.layer-container .gallery').append(tmp);
	$('.layer-container .gallery').width(791 * 2);
	var that = $('.layer-container .gallery').find('li').last().find('img');

	var nextImgH = nextImg.attr('h'),
		nextImgW = nextImg.attr('w');

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

	setTimeout(function() {
		$('.gallery').animate({
			"left": -791
		}, 500, function() {
			$(this).find('li').first().remove();
			$(this).width(791);
			$(this).css({
				'left': 0
			});
			self.on('click', next);
		});
	}, 100);

	self.attr('data-count', num);
	$('.layer .prev-btn').attr('data-count', num);

	function setNextImgHeight() {
		that.height(523);
		setTimeout(function() {
			that.css({
				'marginTop': 0,
				'marginLeft': (791 - that.width()) / 2
			});
		}, 10);
	}

	function setNextImgWidth() {
		that.width(791);
		setTimeout(function() {
			that.css({
				'marginLeft': 0,
				'marginTop': (523 - that.height()) / 2
			});
		}, 10);
	}
}

$('.layer .prev-btn').click(prev);

function prev() {
	var self = $(this);
	var num = parseInt(self.attr('data-count'));
	if (num == 0) {
		return alert("已经是最后一张");
	}
	num--;
	self.off('click');

	var $img = $('#waterfall_container').find('.grid-item .photo');

	var nextImg = $img.eq(num);
	var nsrc = nextImg.attr('src');
	var txt  = nextImg.parents('.base_area').find('.title').text();
	var zan  = nextImg.parents('.base_area').find('.praise span').text();
	var tmp  = $(
		'<li>' +
			'<div class="img-box">' +
				'<img class="" src="' + nsrc + '">' +
			'</div>' +
			'<div class="info">' +
				'<h5 class="title item">' + txt + '</h5>' +
				'<div class="praise item">' +
					'<span>' + zan + '</span>' +
				'</div>' +
			'</div>' +
		'</li>'
	);
	$('.layer-container .gallery').prepend(tmp);
	$('.layer-container .gallery').width(791 * 2).css('left', -791);

	var that = $('.layer-container .gallery').find('li').first().find('img');

	var nextImgH = nextImg.attr('h'),
		nextImgW = nextImg.attr('w');

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

	setTimeout(function() {
		$('.gallery').animate({
			"left": 0
		}, 500, function() {
			$(this).find('li').last().remove();
			$(this).width(791);
			self.on('click', prev);
		});
	}, 100);
	self.attr('data-count', num);
	$('.layer .next-btn').attr('data-count', num);

	function setNextImgHeight() {
		that.height(523);
		setTimeout(function() {
			that.css({
				'marginTop': 0,
				'marginLeft': (791 - that.width()) / 2
			});
		}, 10);
	}

	function setNextImgWidth() {
		that.width(791);
		setTimeout(function() {
			that.css({
				'marginLeft': 0,
				'marginTop': (523 - that.height()) / 2
			});
		}, 10);
	}
}
$('.layer-container .close').click(function() {
	$('.layer-container').hide();
});