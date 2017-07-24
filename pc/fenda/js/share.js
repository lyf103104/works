var hr = "http://zhongsheng.act.qq.com/";
var Tinit = {
	tit : document.title,//分享的标题
	url : hr,//分享的链接
	site: "芬达扭扭舞",//分享的来源
	pic : "../images/share_img.jpg",//分享图片的路径
	con : "TFBOYS携手芬达扭扭瓶，邀你来扭!" //分享摘要
};

var Tshare = {};
function extd(o1, o2) {
	for (var key in o2) {
		o1[key] = o2[key]
	}
	return o1;
}
Tshare.Qzone = function() {
	var p = {
		url: Tinit.url,
		desc: Tinit.tit,
		/*默认分享理由(可选)*/
		summary: Tinit.con ,
		/*分享摘要(可选)*/
		title: Tinit.tit,
		/*分享标题(可选)*/
		site: Tinit.site,
		/*分享来源 如：腾讯网(可选)*/
		pics: " "
		/*分享图片的路径(可选)*/
	};
	var s = [];
	for (var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
	var _u = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&');
	 window.open(_u, '', 'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
}