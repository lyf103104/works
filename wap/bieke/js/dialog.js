var Dialog={
	showDiv:function(Dsobj,mask){
		if(Dsobj===null || Dsobj===undefined){alert("参数未定义！");return false;}
		if(mask==true||mask==undefined){Dialog.showMask();}
		jQuery(".layerbox").hide();
		$Dsobj=jQuery("#"+Dsobj);
		$Dsobj.stop();
		var wHeight = jQuery(parent.window).height();
		var scrollTop = jQuery(parent.window).scrollTop();
		var oHeight = $Dsobj.css("height").replace(/px/,'')/2
		var offsetHeight = wHeight/2+scrollTop - oHeight;
		if(offsetHeight < 0) offsetHeight = 0;
		var w = $Dsobj.css("width");	
		var marginleft = w.replace(/px/,'')/2;
		$Dsobj.addClass("layerbox");
		$Dsobj.css({"position":"absolute","left": "50%","z-index":"100","margin-left":-marginleft});
		
		$Dsobj.css("top",offsetHeight).show()

		jQuery('.close_btn').unbind();
		jQuery('.close_btn').bind('click', function(){Dialog.close();})
		return false;
	},
	showMask : function(){
		var height = jQuery(document).height();
		jQuery("body").append("<div style='background:#000; display:none; filter:alpha(opacity=85);opacity: 0.85; z-index:99;  width:100%;  position:absolute; left:0; top:0;'  id='bgdiv'></div>");
		jQuery("#bgdiv").css("height",height);
		jQuery("#bgdiv").fadeIn();
	},
	close : function(){
		jQuery(".layerbox").hide()
		jQuery("#bgdiv").fadeOut(function(){jQuery("#bgdiv").remove();});
	}

}