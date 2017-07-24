function htmlHight(){
	var h=window.innerHeight;
	var w=window.innerWidth;
	var wMain=h*640/1136;
	var left=(w-wMain)/2;
	$(".wrapCon").css({"height":h});
	$(".wrapBox").css({"width":wMain,"left":left});
}
//input的高度
function  getHight(){
	var h = $(".p_input p").height()*0.4;
	$(".p_input p input").css("height",h+"px");
	}
	
function  getplHight(){
	var h = $(".pinglun").height()*0.7;
	$(".pinglun input").css("height",h+"px");
	}
	
//弹窗
$.fn.mPop = function(){
	    $("body").css("position","relative");
		var sctop =  top.location == self.location ? $(window).scrollTop() : $(parent.window).scrollTop();
		var winW = $(window).width();
    	var winH = $(window).height();
		var tcH = $("body").height();
        var w = $(this).innerWidth();
        var h = $(this).innerHeight();
		$(this).css({"left":(winW - w)/2+"px","z-index":"30"});
    	var bgdiv = "<div class='bgdiv'></div>";  
		$("body").append(bgdiv); 
		if(h>winH){
			$(this).css({"display":"block","top":"0px"})
			}  else{
				$(this).css("display","block").animate({top : ((winH - h)/2 + sctop)+"px"},100,function(){});
				}  
		$(".bgdiv").css({"width": winW + "px","height": tcH + "px","opacity": .7,"position": "absolute","left": "0","top": "0","z-index": 10,"background-color": "#000","display":"block"});
    }
//弹窗关闭	
function zClose(o) {
	$(o).animate({top:"999px"},100,function(){
		$(this).css({"display":"none","top":"0px"});
		$(".bgdiv").eq(0).fadeOut(100,
		function() {
			$(this).remove()
		});
	});
	$(".bgdiv").css({"display":"none"});
				
}

function showRule(){
	$(".rule").animate({top:"31.07%"});
	$(".rulebg").show();
	$(".ruleCon").mCustomScrollbar();
	$(".ruleCon").mCustomScrollbar("update");
}

function closeRule(){
	$(".rule").animate({top:"100%"});
	$(".rulebg").hide();
}


function addPinglun(){
	var str=$(".pinglun input").val();
	//var reg=/^[\u4e00-\u9fa5]+$/;
	if(str=="填写评论(1-15个汉字)"||str==""||str.length<1||str.length>15){
		alert("请填写评论(1-15个汉字)");
    }else{	
	    var html='<p><span>蝎子橙</span>：'+str+'</p>';
	    $(".mCS_touch").prepend(html);
	    $(".pinglun input").val("填写评论(1-15个汉字)");
	}
}

function closeShare(){
	$(".share").hide();
}