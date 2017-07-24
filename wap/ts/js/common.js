(function(win, doc, $) {
	win.onload = function() {
		var $win   = $(win),
			video1 = doc.querySelector('#video1'),
			video2 = doc.querySelector('#video2'),
			video3 = doc.querySelector('#video3');

		loadingFn();
		function loadingFn() {
			var	loadingText = doc.querySelector('.loading_text'),
				loader      = new window.PxLoader(),
				basePath1   = "./images/",
				basePath2   = "./video/",

				// 声明资源文件列表
				fileList    = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "loading_bg.jpg", "loading_icon.png"],
				videoList   = ['video1.mp4', 'video2.mp4', 'video3.mp4'];

			for (var i = 0; i < fileList.length; i++) {
				loader.addImage(basePath1 + fileList[i]);
			}
			for (var i = 0; i < videoList.length; i++) {
				loader.addImage(basePath2 + videoList[i]);
			}

			loader.start();
			loader.addProgressListener(function(e) {
				var percent = Math.round((e.completedCount / e.totalCount) * 100);
				loadingText.innerHTML = percent+'%';
			});
			loader.addCompletionListener(function() {
				$("#loading").hide().next().addClass('showIn');
				bindScroll();
			});
		}

		function bindScroll() {
			$(win).scroll(function() {
				var winH = $win.height(),
					docH = $(doc).height(),
					_top = $win.scrollTop();

				// 滚动到底部
				if(docH - winH == _top){
					setTimeout(function() {
						$win.off('scroll');
						videoHandler();
					}, 100);
				}
			});
		}

		function videoHandler() {
			$('.page1').hide(150);
			$('.page2').show(function() {
				$(this).addClass('showIn');
			});

			$('.page2 .icon').on('click', function() {
				$('html').addClass('oh');
				$('body').addClass('oh');
				currentVideoEvBind($(this), video1, $('.page3'));
			});

			$('.page3 .icon').on('click', function() {
				currentVideoEvBind($(this), video2, $('.page4'));
			});

			$('.page4 .icon').on('click', function() {
				currentVideoEvBind($(this), video3);
			});
		}

		function currentVideoEvBind(self, video, $parent) {
			self.parent().parent().hide();
			video.style.display = 'block';
			video.currentTime   = 0;
			video.play();

			if (!$parent) return win.location.href = 'https://www.baidu.com';

			video.addEventListener('ended', function() {
				video.style.display = 'none';
				$parent.show(function() {
					$parent.addClass('showIn');
				});
			}, false);
		}
	};
})(window, document, jQuery);