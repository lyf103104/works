/*
*使用方法:
*界面构造(IMG标签外必须拥有DIV 而且必须给予DIV控件ID)
* <div id="imgdiv"><img id="imgShow" width="120" height="120" /></div>
* <input type="file" id="up_img" />
*调用代码:
* new uploadPreview({ UpBtn: "up_img", DivShow: "imgdiv", ImgShow: "imgShow" });
*参数说明:
*UpBtn:选择文件控件ID;
*DivShow:DIV控件ID;
*ImgShow:图片控件ID;
*Width:预览宽度;
*Height:预览高度;
*ImgType:支持文件类型 格式:["jpg","png"];
*callback:选择文件后回调方法;
*/

/*
*work:图片预览插件
*/
var uploadPreview = function(setting) {

    /*
    *work:this(当前对象)
    */
    var _self = this;
    /*
    *work:判断为null或者空值
    */
    _self.IsNull = function(value) {
        if (typeof (value) == "function") { return false; }
        if (value == undefined || value == null || value == "" || value.length == 0) {
            return true;
        }
        return false;
    }
    /*
    *work:默认配置
    */
    _self.DefautlSetting = {
        UpBtn: "",
        DivShow: "",
        ImgShow: "",
        Width: 316,
        Height: 316,
        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        ErrMsg: "选择文件错误,图片类型必须是(gif,jpeg,jpg,bmp,png)中的一种",
        callback: function() {
            Dialog.showDiv("layer_preview");
			/*if(_self.Setting.UpBtn=="up_img"){
                $("#up_img").remove();
				$("#uploader_box").append('<input type="file" id="up_img" class="file" accept="image/gif,image/jpeg,image/jpg,image/png" />');
				new uploadPreview({ UpBtn: "up_img", DivShow: "imgdiv", ImgShow: "imgShow0"});
			}
			else if(_self.Setting.UpBtn=="reset_file"){
                $("#reset_file").remove();
				$("#re_upload").append('<input type="file" id="reset_file" accept="image/gif,image/jpeg,image/jpg,image/png">');
				new uploadPreview({ UpBtn: "reset_file", DivShow: "imgdiv", ImgShow: "imgShow0"});
			}
            else return false;*/
        }
    };
    /*
    *work:读取配置
    */
    _self.Setting = {
        UpBtn: _self.IsNull(setting.UpBtn) ? _self.DefautlSetting.UpBtn : setting.UpBtn,
        DivShow: _self.IsNull(setting.DivShow) ? _self.DefautlSetting.DivShow : setting.DivShow,
        ImgShow: _self.IsNull(setting.ImgShow) ? _self.DefautlSetting.ImgShow : setting.ImgShow,
        Width: _self.IsNull(setting.Width) ? _self.DefautlSetting.Width : setting.Width,
        Height: _self.IsNull(setting.Height) ? _self.DefautlSetting.Height : setting.Height,
        ImgType: _self.IsNull(setting.ImgType) ? _self.DefautlSetting.ImgType : setting.ImgType,
        ErrMsg: _self.IsNull(setting.ErrMsg) ? _self.DefautlSetting.ErrMsg : setting.ErrMsg,
        callback: _self.IsNull(setting.callback) ? _self.DefautlSetting.callback : setting.callback
    };
    /*
    *work:获取文本控件URL
    */
    _self.getObjectURL = function(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    /*
    *work:绑定事件
    */
    _self.Bind = function() {
        document.getElementById(_self.Setting.UpBtn).onchange = function() {
            if (this.value) {
                if (!RegExp("\.(" + _self.Setting.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert(_self.Setting.ErrMsg);
                    this.value = "";
                    return false;
                }
                if (navigator.userAgent.indexOf("MSIE") > -1) {
                    try {
                        document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]);
                    } catch (e) {
                        var div = document.getElementById(_self.Setting.DivShow);
                        this.select();
                        top.parent.document.body.focus();
                        var src = document.selection.createRange().text;                        
                        document.selection.empty();
                        document.getElementById(_self.Setting.ImgShow).style.display = "none";
                        div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        div.style.width = _self.Setting.Width + "px";
                        div.style.height = _self.Setting.Height + "px";
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                    }
                } else {
                    //成功添加图片
                    var img;
                    img = new Image();
                    img.src = _self.getObjectURL(this.files[0])
                    document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]); 
                    img.onload = function () {
                        var h    = this.height;
                        var w    = this.width;
                        var $img = $('#imgShow0');
                        if (h > w) {
                            if (h > 316) {
                                h = 316;
                                w = parseInt(h * this.width / this.height);
                                console.log("w2"+w + "h2"+h);
                                $img.css({
                                    'width': 'auto',
                                    'height': '316px',
                                    'left': (316 - w) / 2,
                                    'top': '0'
                                });
                            } else {
                                $img.css({
                                    'left': (316 - w) / 2,
                                    'top': (316 - h) / 2
                                });
                            }
                        } 
                        else if (w > h) {
                            if (w > 316) {
                                w = 316;
                                h = parseInt(w * this.height / this.width);
                                $img.css({
                                    'width': '316px',
                                    'height': 'auto',
                                    'left': '0',
                                    'top': (316 - h) / 2
                                });
                            } else {
                                $img.css({
                                    'left': (316 - w) / 2,
                                    'top': (316 - h) / 2
                                });
                            }
                        }
                        else{
                            if (w > 316) {
                                $img.css({
                                    'width': '316px',
                                    'height': '316px',
                                    'left': '0',
                                    'top': '0'
                                });
                            } else {
                                $img.css({
                                    'width': w,
                                    'height': h,
                                    'left': (316 - parseInt(w))/2,
                                    'top': (316 - parseInt(h))/2
                                });
                            }
                        }
                    };                    
                }                
                _self.Setting.callback();
            }
        }
    }
    /*
    *work:执行绑定事件
    */
    _self.Bind();
}