//明星模板
function randomsort(a, b) {
	return Math.random() > .5 ? -1 : 1; //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
var arr     = [1, 2, 3];
var textStr = ["，爱我你就摸摸我.", "，爱我你就抱抱我.", "，爱我你就亲亲我."];

arr.sort(randomsort);

var url = 0;

$(".p_input p span").html(textStr[arr[url] - 1]);

var stage = new createjs.Stage("starCanvas");

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", stage);

var mask, bitmap, text, tit;

var p     = new Image(),
	q     = new Image(),
	bgImg = new Image(),
	mImg  = new Image();

bgImg.src = "images/draw_bg.png";
mImg.src  = "images/img" + arr[url] + ".png";


window.onload = function() {
	htmlHight();
	getHight(); //input高度

	$(".pinglunCon").mCustomScrollbar();
	$(".pinglunCon").mCustomScrollbar("update");

	if (createjs.Touch.isSupported()) {
		createjs.Touch.enable(stage, true, false);
		console.info("enable Touch!");
	}
	model   = new createjs.Bitmap('images/img' + arr[url] + '.png');
	model.x = 3;
	model.y = 3;
	stage.addChild(model);

	bitmap   = new createjs.Bitmap('images/draw_bg.png');
	bitmap.x = 3;
	bitmap.y = 3;
	stage.addChild(bitmap);

	var bg = new createjs.Bitmap("images/canvas_bg.png");
	stage.addChild(bg);

	//添加明星模板
	mask   = new createjs.Bitmap('images/board.png');
	mask.x = 3;
	mask.y = 3;
	stage.addChild(mask);

	//宣言
	tit   = new createjs.Bitmap('images/tit' + arr[url] + '.png');
	tit.x = 30;
	tit.y = 525;
	stage.addChild(tit);

	//宣言
	text   = new createjs.Text("", "20px Microsoft YaHei", "#c69956");
	text.x = 30;
	text.y = 525;
	text.lineHeight = 40;
	stage.addChild(text);

	$(".rightBtn").click(function() {
		url          = url < 2 ? url + 1 : 0;
		mImg.src     = 'images/img' + arr[url] + '.png';
		model.image  = mImg;
		q.src        = 'images/tit' + arr[url] + '.png';
		tit.image    = q;
		$(".file input").val("");
		p.src        = "";
		bitmap.image = bgImg;
		$(".p_input p input").val("");
		$(".p_input p span").html(textStr[arr[url] - 1]);
	});
	$(".leftBtn").click(function() {
		url         = url == 0 ? 2 : url - 1;
		mImg.src    = 'images/img' + arr[url] + '.png';
		model.image = mImg;
		q.src       = 'images/tit' + arr[url] + '.png';
		tit.image   = q;
		$(".file input").val("");
		p.src       = "";
		$(".p_input p input").val("");
		$(".p_input p span").html(textStr[arr[url] - 1]);
	});
	//预览图片
	var initialScale;
	window.preview = function(e) {
		var f      = e.files[0];
		var reader = new FileReader();

		reader.onload = function(e) {
			var tag   = '';
			var src   = e.target.result;
			var index = src.indexOf("base64");

			src   = "data:image/jpeg;" + src.substring(index, src.length);
			p.src = src;

			p.onload = function() {
				/*! exif handler */
				EXIF.getData(f, function() {

					var _dataTxt  = EXIF.pretty(this);
					var _dataJson = JSON.stringify(EXIF.getAllTags(this));

					var tag = EXIF.getTag(this, 'Orientation');

					if (p.width > 3000) {
						initialScale = 0.3;
					} else if (p.width > 1000) {
						initialScale = 0.5;
					} else {
						initialScale = 1;
					}

					var expectWidth  = p.naturalWidth;
					var expectHeight = p.naturalHeight;

					if (p.naturalWidth > p.naturalHeight && p.naturalWidth > 800) {
						expectWidth = 800;
						expectHeight = expectWidth * p.naturalHeight / p.naturalWidth;
					} else if (p.naturalHeight > p.naturalWidth && p.naturalHeight > 1200) {
						expectHeight = 1200;
						expectWidth = expectHeight * p.naturalWidth / p.naturalHeight;
					}

					var canvas    = document.createElement("canvas");
					var ctx       = canvas.getContext("2d");
					canvas.width  = expectWidth;
					canvas.height = expectHeight;
					ctx.drawImage(p, 0, 0, expectWidth, expectHeight);

					if (navigator.userAgent.match(/iphone/i)) {
						if (tag !== "" && tag != 1) {
							switch (tag) {
								case 6: //需要顺时针（向左）90度旋转
									rotateImg(p, 'left', canvas);
									break;
								case 8: //需要逆时针（向右）90度旋转
									rotateImg(p, 'right', canvas);
									break;
								default:
								rotateImg(p, null, canvas);
							}

						} else {
							rotateImg(p, null, canvas);
						}

					} else if (navigator.userAgent.match(/Android/i)) {
	                    rotateImg(p, null, canvas);
	                }
				});
			};
		};
		reader.readAsDataURL(f);
	};

	function rotateImg(img, direction, canvas) {
		var _w, _h;
		var ctx = canvas.getContext('2d');

		if (direction !== null) {
			//最小与最大旋转方向，图片旋转4次后回到原方向
			var min_step = 0;
			var max_step = 3;

			var height = img.height;
	        var width  = img.width;

	        var step = 2;
	        if (step === null) {
	            step = min_step;
	        }

			if (direction === 'right') {
				step++;
				//旋转到原位置，即超过最大值
				step > max_step && (step = min_step);
			} else {
				step--;
				step < min_step && (step = max_step);
			}

			var degree = step * 90 * Math.PI / 180;


			switch (step) {
				case 0:
					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0);
					break;
				case 1:
					canvas.width = height;
					canvas.height = width;
					ctx.rotate(degree);
					ctx.drawImage(img, 0, -height);
					break;
				case 2:
					canvas.width = width;
					canvas.height = height;
					ctx.rotate(degree);
					ctx.drawImage(img, -width, -height);
					break;
				case 3:
					canvas.width = height;
					canvas.height = width;
					ctx.rotate(degree);
					ctx.drawImage(img, -width, 0);
					break;
			}

			_w = img.height;
			_h = img.width;
		} else {
			_w = img.width;
			_h = img.height;

			canvas.width  = _w;
			canvas.height = _h;
			ctx.drawImage(img, 0, 0);
		}


		var base64 = canvas.toDataURL("image/jpeg", 0.8);

		model.image      = bgImg;
		bitmap.image.src = newImg2.src = base64;


		var ratio = _w < _h ? 484 / _h : 514 / _w;

		bitmap.x      = 514 / 2;
		bitmap.y      = 484 / 2;
		bitmap.scaleX = ratio;
		bitmap.scaleY = ratio;
		bitmap.regX   = _w / 2;
		bitmap.regY   = _h / 2;

	}

	// 旋转
	touch.on('#starCanvas', 'touchstart', function(ev) {
		if (ev.fingersCount == 2) {
			ev.startRotate();
		}
		ev.preventDefault();
	});
	// 抓取并移动
	var dx, dy;
	touch.on("#starCanvas", 'drag', function(ev) {
		if (ev.fingersCount == 1) {
			dx = dx || bitmap.x;
			dy = dy || bitmap.y;
			var offx = dx + ev.x;
			var offy = dy + ev.y;
			bitmap.x = offx;
			bitmap.y = offy;
		}
	});
	touch.on("#starCanvas", 'dragend', function(ev) {
		dx += ev.x;
		dy += ev.y;
	});
	//缩放并旋转
	var currentScale;
	var angle = bitmap.rotation;
	touch.on('#starCanvas', 'pinch', function(ev) {
		angle = bitmap.rotation;

		var totalAngle = angle + ev.rotation;

		if (ev.fingerStatus === 'move') {
			angle = angle + ev.rotation / 40;
			bitmap.rotation = angle;
		}
		currentScale  = (ev.scale - 1) / 4;
		currentScale  = initialScale + currentScale;
		currentScale  = currentScale > 2 ? 1.5 : currentScale;
		currentScale  = currentScale < 0 ? 0.4 : currentScale;
		bitmap.scaleX = bitmap.scaleY = currentScale;
	});
	touch.on('#starCanvas', 'pinchend', function(ev) {
		initialScale    = currentScale;
		bitmap.rotation = angle;
	});

	// 一键美化
	var newImg2 = new Image();
	var $beautifyBox  = $('.beautifyBox');
	var $beautifywrap = $('.beautifyBox .wrap');

	layoutBindEvent();
	function layoutBindEvent() {
		$('.beautifyOpen').on('click', function() {
			$beautifyBox.removeClass('zindex');
			$beautifywrap.addClass('slidedown');
		});

		$beautifyBox.on('click', function(ev){closeBeautify(ev)});
		$beautifywrap.find('.item').on('click', beautifyHandler);
	}

	function closeBeautify(ev) {
		if (ev.target.id === 'beautifyWrap') return false;
		if (ev.target.getAttribute('data-preset')) return false;
		$beautifywrap.removeClass('slidedown');
		setTimeout(function() {$beautifyBox.addClass('zindex')}, 6e2);
	}

	function beautifyHandler() {
		var src = bitmap.image.outerHTML;
		if (src == '<img src="images/draw_bg.png">' || src == "") return alert("请选择图片！");

		var that   = $(this);
		var filter = that.attr('data-preset');

		that.text('loading...').addClass('active');
		$beautifyBox.off('click');
		$beautifywrap.find('.item').off('click');

		// var _w = p.width,
			// _h = p.height;
		var _w = bitmap.image.width,
			_h = bitmap.image.height;

		// var ratio = _w < _h ? 484 / _h : 514 / _w;

		var newImg    = new Image();
		var newCanvas = document.createElement('canvas');

		var ctx = newCanvas.getContext('2d');

		if (_w > 517) {
			_h = 517/_w*_h;
			_w = 517;
		}

		newCanvas.width  = _w;
		newCanvas.height = _h;

		// newImg2.onload = function() {
		ctx.drawImage(newImg2, 0, 0, newCanvas.width, newCanvas.height);

		var dataURL = newCanvas.toDataURL("image/jpeg");

		ctx.clearRect(0, 0, newCanvas.width, newCanvas.height);

		newImg.src = dataURL;
		newImg.id  = 'newImg';

		newImg.onload = function() {
			$('body').append(newImg);

			$('#newImg').hide();

			Caman('#newImg', function() {
				this.revert(false);
				this[filter]();
				this.render(done);
			});
		};
		// };

		function done() {
			var src = Caman('#newImg').toBase64();
			var temporaryImg = new Image();

			temporaryImg.src = bitmap.image.src = src;

			temporaryImg.onload = function() {
				var _w = temporaryImg.width,
					_h = temporaryImg.height;

				var ratio = _w < _h ? 484 / _h : 514 / _w;

				bitmap.x      = 514 / 2;
				bitmap.y      = 484 / 2;
				bitmap.regX   = _w / 2;
				bitmap.regY   = _h / 2;
				bitmap.scaleX = ratio;
				bitmap.scaleY = ratio;

				$('#newImg').remove();
				that.text(filter).removeClass('active');
				$beautifywrap.find('.item').on('click', beautifyHandler);
				$beautifyBox.on('click', function(ev){closeBeautify(ev)});
			};
		}
	}
}

// 合成图像
var dataURL;

function saveImage() {
	var canvas = document.getElementById("starCanvas");
	var ctx    = canvas.getContext("2d");

	dataURL    = canvas.toDataURL("image/jpeg"); //后台要获取的图片地址;
	console.log(dataURL);

	// var newImg = new Image();

	// newImg.src = dataURL;

	// newImg.onload = function() {
	// 	$('body').append(newImg);

	// 	$(newImg).css({
	// 		'width': '100%',
	// 		'height': 'auto',
	// 		'position': 'absolute',
	// 		'top': 0,
	// 		'left': 0,
	// 		'z-index': 9999
	// 	});
	// }

	//保存图片后跳转新页面显示
	// window.location = "showPhoto.html";
}

function uploadOk(){saveImage()}

function checkInput(){
	var src=bitmap.image.outerHTML;
	var input=$(".p_input p input").val();
	var reg=/^[\u4e00-\u9fa5]+$/;
	if(src=='<img src="images/draw_bg.png">'||src==""){
		alert("请选择图片！")
	}else if(input=""||input.length<3||input.length>15||!reg.test(input)){
		alert("请输入3-15个汉字！")
	}else{
		document.getElementById("textInput").style.imeMode='disabled';//关闭当前输入法
		inputbur();
		setTimeout(function(){$(".tc_accept").mPop();},100);
	}
}

var str,s1,s2;
function inputbur(){
	var val=$(".p_input input").val();
	if(val.length>=3){
	   str=val+$(".p_input span").html();
	   var len=str.length;
	   if(len>16){
		   text.y = 515;
		   text.lineHeight=34;
		   for(var i = 1;i<len; i++){
		     s1=str.substr(0,16);
			 s2=str.substr(16,len-1);
		   }
		   text.text="#FEEL EVERYTHING#\n"+s1+'\n'+s2;
		}else{
		   text.text="#FEEL EVERYTHING#\n"+str;
		}
		stage.removeChild(tit);
	}
}
