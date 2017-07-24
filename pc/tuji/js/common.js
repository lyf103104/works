//5月2号领取超级礼包
$(function(){
    //抽奖
    var count = 5;
	$(".start").click(function(){
	  var pr =  Math.ceil(Math.random()*8);//8以内的随机数
      if (count === 0) {
        return alert('没有抽奖机会');
      }
      count--;
      $('.container .lucky-wrap .lucky-nums span').text(count);
	  $(".game").block({
			"step":pr,
			"callback":function(){
				setTimeout(function(){gotopage(pr)},1000);
			}
	  });
	})
// 抽奖结果
function gotopage(e) {
    var t = e; 
	(t == 3) && alert("谢谢参与"),
    (t == 1) && alert("CONDOR战术护卫鼠标垫"),
    (t == 2) && alert("《突击英雄》定制鼠标垫"),
	(t == 4) && alert("CONDOR单肩摄影包"),
    (t == 5) && alert("京东E卡 100元"),
    (t == 6) && alert("《突击英雄》定制T恤"),
	(t == 7) && alert("CONDOR战术T恤"),
    (t == 8) && alert("Iphone6 16G")
}
var isok = !0;
$.fn.block = function(e) {
    var t = $.extend({},
    $.fn.block.defaults, e);
    return this.each(function(e) {
        function a() {
            o = setInterval(function() {
                clearInterval(i),
                s = setInterval(c, 200)
            },
            t.loop * 1e3)
        }
        function f() {
            i = setInterval(l, parseInt(1e3 / (t.grade * 2))),
            a()
        }
        function l() {
            r.children("li.play[pr=" + n + "]").addClass("ov").siblings(".ov").removeClass("ov"),
            n < t.grade - 1 ? n++:n = 0
        }
        function c() {
            n > t.grade - 1 ? n = 0: n++,
            t.step == n && (clearInterval(o), clearInterval(s), isok = !0, t.callback.call()),
            r.children("li.play[pr=" + (n - 1) + "]").addClass("ov").siblings(".ov").removeClass("ov")
        }
        var n;
        n == "undefined" ? n = 0: n = $(this).find(".ov").index();
        var r = $(this),
        i,
        s,
        o,
        u = parseInt(t.step);
        if (!isok) return ! 1;
        isok = !1,
        f()
    })
},
$.fn.block.defaults = {
    grade: 8,
    step: 3,
    loop: 3,
    callback: null
};
$.fn.extend({
    picScroll: function() {
        function r() {
            $(".pc_only").css({
                width: e * (t + 1) + "px"
            }).find("ul:first").clone().appendTo(".pc_only"),
            $(".pc_only").animate({
                left: -e + "px"
            },
            1500, 
            function() {
                $(".pc_only").find("ul:first").remove(),
                $(".pc_only").css({
                    left: "0px",
                    width: e * t + "px"
                })
            })
        }
        var e = $(".pc_only").find("ul").width(),
        t = $(".pc_only").find("ul").length;
        $(".pc_only").css("width", e * t + "px");
        var n = setInterval(r, 3e3);
        $(".pc_only").live("mouseenter", 
        function() {
            clearInterval(n)
        }).live("mouseleave", 
        function() {
            n = setInterval(r, 3e3)
        })
    }
});

});