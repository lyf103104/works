var Exposure = (function ($) {
	var template = '', 
		len = 30,
		imgSource = '../images/1.jpg';
	for (var i = 0; i < len; i++) {
		template += '<li><img src="../images/blank.jpg"></li>';
	}
	$('.lazy-wrap').append(template);
	$('.lazy-wrap img').attr('data-src', imgSource);
	var Exposure = (function () {
		function one ($selector, callback) {
			new lazy($selector, callback);
		}
		function lazy ($selector, callback) {
			this.$selector = $selector;
			this.cb  = callback;
			this.queue  = [];
			this.isBind = false;
			this.add();
			this.init();
		}
		lazy.prototype = {
			add: function ($selector, cb) {
				var self = this;
				this.$selector.each(function () {
					var $cur = $(this);
					self.queue.push({
						el: $cur,
						cb: self.cb
					});
				});
			},
			init: function () {
				if (!this.isBind) {
					this.bind();
				}
				this.cumponte();
			},
			bind: function () {
				var self  = this,
					timer = null,
					interval = 40;
				$(window).on('scroll', function () {
					timer && clearTimeout(timer);
					timer = setTimeout(function () {
						self.cumponte();
					}, interval);
				});
				self.isBind = true;
			},
			cumponte: function () {
				for (var i = 0; i < this.queue.length; i++) {
					var item = this.queue[i];
					if (this.isShow(item.el)) {
						item.cb.call(item.el);
					}
				}
			},
			isShow: function ($el) {
				var scrollH = $(window).scrollTop(),
					winH = $(window).height(),
					top = $el.offset().top;
				return (top < winH + scrollH) ? true : false;
			}
		};
		return {
			one: one
		};
	})();

	return Exposure;
	
})(jQuery);