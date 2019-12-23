//login js 
//author:jingchao.zhu
//2016-4-15
require.config({
	baseUrl : "/passport/js/common-js",
});
require([ 'jquery', 'web' ,'dialog_new','plugins/validatorClass','fingerprint.pc'], function($, E, D,validatorClass,Finger) {

	var nextUrl = LoginController.nextUrl;
	var existGuid = LoginController.existGuid;
	var lang = LoginController.language;
	var level = $('#loginLevel').val() || 1
	localStorage.setItem('loginLevel',level)
	var login = E.module.create({

		init : function(){
			//兼容firefox
			$("input[name='loginType']").removeAttr("checked");
			$("input[method='normalLogin']").prop("checked",true);
            this.validator = new validatorClass();
			//增加指纹校验
            //author:rui.wang1
			//2017-11-7
			if(level == 3) {

                //风险等级为l3，跳转至手机号登录，并隐藏密码登录入口
                $("#ElongLogin").hide();
                // $("#NoCodeLogin").attr("class", "formbox phonebox errorBox");
                // var tip = "en"==lang ? "Risk level higher, please use phone verification code login" : "风险等级较高， 请使用短信验证码登录";
                // $("#UserPhoneErroTip").html(tip).show();
                $("#DynamicLogin").show();
                $("#LoginTypeChoose").hide();
			}
		},
        getConstID: function() {
            var _this = this;
            var options = {
                appId: '8a627b6a532dd7277e2027d3d3530925', // 唯一标识，必填
                server: 'https://sec.ly.com/yf/udid/c1', // ConstID 服务接口，必填
            };
            _dx.ConstID(options, function (e, id) {
                if (e) {
                    console.log('error: ' + e);
                    return;
                }
                _this.ConstID = id;
            });
        },
		initDom : function(){
			this.UserName = $("#UserName");
			this.PassWord = $("#PassWord");
			this.normalLogin = $("#ElongLogin");
			this.validateCode = $("#ValidateCode");
			this.language = lang;

			//动态登录
			this.dynamicLogin = $("#DynamicLogin");
			this.userPhone = $("#userPhone");
	        this.dynamicCode = $("#input_DynamicCode");
	        this.getDynamicCodeBTN = $("#GetDynamicCode");
	        this.validateCodeDynamic = $("#ValidateCode_Dynamic");
			//登录类型选择
			this.loginType = $("#LoginTypeChoose");
			//选择二维码登录
			this.switchCodeLogin = $("#switchCodeLogin");
			//刷新二维码
			this.refreshCode = $("#RefreshCode");
			//扫二维码帮助
			this.codeHelp=$("#help");
			//记住我
			this.rememberMe = $("#pageinputRememberMe");
			this.rememberDynamic = $("#remember4Dynamic");
			this.validateUrl = "/passport/getValidateCode";
			this.getConstID();
		},

		initEvent : function(){
			this.normalLogin.bind("click", E.addEvent(this, this.onClickElongLogin));
			this.normalLogin.bind("keydown", E.addEvent(this, this.onClickElongLogin));
			this.loginType.bind("click",E.addEvent(this,this.chooseLoginType));
			this.switchCodeLogin.bind("click",E.addEvent(this,this.qrCodeLogin));
			this.refreshCode.bind("click",E.addEvent(this,this.refreshQrCode));
			this.codeHelp.bind("mouseover",E.addEvent(this,this.showHelp));
			this.codeHelp.bind("mouseout",E.addEvent(this,this.closeHelp));
			this.rememberMe.bind("click",E.addEvent(this,this.clickRememberMe));
			this.rememberDynamic.bind("click",E.addEvent(this,this.clickRememberMe));
			this.UserName.bind("blur",E.addEvent(this,this.LeaveLoginAreaClick));
			this.PassWord.bind("blur",E.addEvent(this,this.LeaveLoginAreaClick));
			this.validateCode.bind("blur",E.addEvent(this,this.LeaveLoginAreaClick));
			this.dynamicLogin.bind("click",E.addEvent(this,this.onClickDynamicLogin));
			this.userPhone.bind("blur",E.addEvent(this,this.LeaveDynamicLoginAreaClick));
			this.dynamicCode.bind("blur",E.addEvent(this,this.LeaveDynamicLoginAreaClick));
			this.validateCodeDynamic.bind("blur",E.addEvent(this,this.LeaveDynamicLoginAreaClick));
			this.getDynamicCodeBTN.bind("click",E.addEvent(this,this.getDynamiclick));
		},

		//登录类型选择
		chooseLoginType : function(event) {
			var element = E.event.element(event);
			var method = element.attr("method");

			switch(method){

			case "normalLogin":
				//卡号登录
				this.dynamicLogin.hide();
				$("#NoCodeLogin").attr("class", "formbox errorBox");
				this.normalLogin.show();
				break;
			case "dynamicLogin":
				//手机号登录
				this.normalLogin.hide();
				$("#NoCodeLogin").attr("class", "formbox phonebox errorBox");
				this.dynamicLogin.show();
				break;
			}

		},
		//手机号登录
		onClickDynamicLogin : function(event){
			var that = this;
			var element = E.event.element(event);
			var method = element.attr("method");
			switch(method){
				case "DynamicLoginSubmit":
					//防止重复提交
					if ($("a[method='DynamicLoginSubmit']").attr("usable") == "true") {
						$("#PhoneTypeList").hide();
	                    if(!this.dynamicValidateLogin(event))
	                    	return ;

	                    if ($("a[method='DynamicLoginSubmit']").attr("usable") == "true") {
	                        $("a[method='DynamicLoginSubmit']").attr("usable", "false");
	                        if (!isEnglish(lang)) {
	                            this.dynamicLogin.find("a[method='DynamicLoginSubmit']").html("登录中…");
	                        }
	                        else {
	                            this.dynamicLogin.find("a[method='DynamicLoginSubmit']").html("Sign in…");
	                        }
	                    }

	                    var validateCode = "";
	                    if ($("div#VCodeDiv").is(":visible")) {
	                        validateCode = $("input#ValidateCode_Dynamic").val();
	                    }

	                    var dynamicCode = $("#input_DynamicCode").val();
	                    var userPhone = $("#userPhone").val();

	                    var phoneType = $("#PhoneType").attr("value");
	                    var extendUserPhone;

	                    if (phoneType == "1" || phoneType == "5") {
	                        extendUserPhone = userPhone;
	                    }
	                    if (phoneType == "2" || phoneType == "6") {
	                        extendUserPhone = "852" + userPhone;
	                    }
	                    if (phoneType == "3" || phoneType == "7") {
	                        extendUserPhone = "853" + userPhone;
	                    }
	                    if (phoneType == "4" || phoneType == "8") {
	                        extendUserPhone = "886" + userPhone;
	                    }


	                    var remeberMe = false;
	                    if ($("span#remember4Dynamic").attr("class").toLowerCase().indexOf("off") != -1) {
	                    	remeberMe = true;
	                    }
                        var token = window.fingerPrintToken || ''

	                    $.ajax({
							type:'POST',
							url:'/passport/ajax/dynamicLogin',
							data:{
								"dynamicCode":dynamicCode,
								"extendUserPhone":extendUserPhone,
								"validateCode":validateCode,
								"rememberMe":remeberMe,
								"token":token,
                                'ConstID': that.ConstID,
                                'nexturl':nextUrl
							},
							success:function(data){
								//展示验证码
								if(data.isShowVerifyCode && data.code!="700")
									$("#VCodeDiv").show();

								switch (data.code) {
									case "700":
										var esid=data.esid;
										//中英文互通
//										window.location.href = "http://my.elong.com/Connection_cn.html?esid="+esid+"&nextUrl=" + nextUrl + "&rememberMe="+remeberMe;
                                        loginTc(data, function () {
                                            connentionEN(data.esid,nextUrl,remeberMe);
                                        });
										break;
									case "704":
										    $("#VCodeDiv").show();
//				                            $("#validate_result_Dynamiic").html(isEnglish(lang)? "Graphical verification code error, please enter again" : "图形验证码错误，请重新输入").show();
										 	$("#validateResult").show();
				                            getVcode($("img[method='ChangeVidateCode_Dynamic']"))
				                            $("a[method='DynamicLoginSubmit']").attr("usable", "true");
				                            $("#DynamicLogin").find("a[method='DynamicLoginSubmit']").html(isEnglish(lang) ? "Sign in" : "登录");
										break;
									case "200":
									case "201":
									case "202":
	                                    $("#DynamicCodeErroTip").html(isEnglish(lang) ? "Dynamic password fails, please get it again." : "您的动态密码已过期，请重新获取").show();
	                                    getVcode($("img[method='ChangeVidateCode_Dynamic']"));
//	                                    $("#VCodeDiv").show();
	                                    $("a[method='DynamicLoginSubmit']").attr("usable", "true");
	                                    $("#DynamicLogin").find("a[method='DynamicLoginSubmit']").html(isEnglish(lang) ? "Sign in" : "登录");
	                                    break;
									case "305":
									case "302":
		                                    $("#DynamicCodeErroTip").html(isEnglish(lang) ? "The current verification code input errors" : "您的动态密码输入有误，请重新输入").show();

		                                    //输入动态码错误即出图形验证码
		                                    getVcode($("img[method='ChangeVidateCode_Dynamic']"));
		                                    $("#VCodeDiv").show();
		                                    $("a[method='DynamicLoginSubmit']").attr("usable", "true");
		                                    $("#DynamicLogin").find("a[method='DynamicLoginSubmit']").html(isEnglish(lang) ? "Sign in" : "登录");
		                                    break;
									default:
											$("#UserPhoneErroTip").html(data.message).show();
//											$("#VCodeDiv").show();
											getVcode($("img[method='ChangeVidateCode_Dynamic']"));
											$("a[method='DynamicLoginSubmit']").attr("usable", "true");
											$("#DynamicLogin").find("a[method='DynamicLoginSubmit']").html(isEnglish(lang) ? "Sign in" : "登录");
										break;
								}


							}
						});

					}
					break;
				case "showPhoneTypes":
					if ($("#PhoneTypeList").is(":visible")) {
	                    $("#PhoneTypeList").hide();
	                }else{
	                	$.ajax({
	    					type:'GET',
	    					url:'/passport/ajax/getPhoneAcList',
	    					data:"language="+this.language,
	    					success:function(res){
	    						if(res.success==0)
	    							return;
	    						var phonelist = '';
	    						for(var i=0;i<res.Data.length;i++)
	    							phonelist = phonelist + "<li value=\"" + res.Data[i].AcId + "\"" + "method=\"selectPhoneType\">" + res.Data[i].AcDsc + "</li>";
	    						$("#PhoneTypeList").html(phonelist);
	    					}
	    				});
	                	$("#PhoneTypeList").show();
	                }
					break;
				case "selectPhoneType":
					var phoneType = element.attr("value");
	                $("#PhoneTypeList").hide();
					//console.log(element);
	                $("#PhoneType").attr("value", phoneType);
	                switch (phoneType) {
	                    case 1:
						case  "1":
	                    case 5:
	                        var phoneAc = isEnglish(lang) ? "CN(+86)" : "中国大陆+86";
	                        $("#PhoneType").html(phoneAc);
	                        break;
	                    case 2:
						case  "2":
	                    case 6:
	                        var phoneAc = isEnglish(lang) ? "HK(+852)" : "中国香港+852";
	                        $("#PhoneType").html(phoneAc);
	                        break;
	                    case 3:
	                    case 7:
						case  "3":
	                        var phoneAc = isEnglish(lang) ? "MC(+853)" : "中国澳门+853";
	                        $("#PhoneType").html(phoneAc);
	                        break;
	                    case 4:
						case  "4":
	                    case 8:
	                        var phoneAc = isEnglish(lang) ? "TW(+886)" : "中国台湾+886";
	                        $("#PhoneType").html(phoneAc);
	                        break;

	                }
					break;
				case "ValidateUserPhone":
					$("#PhoneTypeList").hide();
	                var tipMemberInfo = element.val();
	                if (tipMemberInfo.indexOf("输入") > -1 || tipMemberInfo.indexOf("enter") > -1)
	                	element.val("");
	                $("#UserPhoneErroTip").hide();
					break;
				case "ValidateDynamicCode":
	                $("#PhoneTypeList").hide();
	                var value = element.val();
	                if (value.indexOf("输入") > -1 || value.indexOf("Enter") > -1) {
	                    element.val("");
	                }
	                $("#DynamicCodeErroTip").hide();
	                break;
				case "CheckValidateCode_Dynamic":
	                $("#PhoneTypeList").hide();
	                var value = element.val();
	                if (value.indexOf("验证") > -1 || value.indexOf("Security code") > -1) {
	                    element.val("");
	                }
	                $("#validate_result_Dynamiic").hide();
	                break;
				case "NormalLoginLink":
	                this.loginType.find("input[method='normalLogin']").click();
	                break;
				case "ChangeVidateCode_Dynamic":
				case "HrefVlidateCode_Dynamic":
				    getVcode($("#ValidateCodeImg"));
					break;
				case "hrefSina":
	                var url = "http://openapi.elong.com/sina.html";
	                window.location.href = url;
	                break;
		        case "hrefQQ":
		            var url = "http://openapi.elong.com/qq.html";
		            window.location.href = url;
		            break;
		       case "hrefWeixin":
		             var url = "http://openapi.elong.com/weixin.html";
		             window.location.href = url;
		             break;
		        case "hrefAlipay":
		             var url = "http://openapi.elong.com/alipay.html";
		             window.location.href = url;
		             break;
		        case "hrefRenRen":
		             var url = "http://openapi.elong.com/renren.html";
		             window.location.href = url;
		             break;
			}
		},

		//获取手机动态码
		getDynamiclick : function(event) {
			var that = this;
			$("#PhoneTypeList").hide();
	        var userPhone = $("#userPhone").val();
	        var extendUserPhone;
	        var phoneType = $("#PhoneType").attr("value");
	        if (phoneType == "1" || phoneType == "5") {
	            extendUserPhone = userPhone;
	        }
	        if (phoneType == "2" || phoneType == "6") {
	            extendUserPhone = "852" + userPhone;
	        }
	        if (phoneType == "3" || phoneType == "7") {
	            extendUserPhone = "853" + userPhone;
	        }
	        if (phoneType == "4" || phoneType == "8") {
	            extendUserPhone = "886" + userPhone;
	        }

	        if (""==userPhone|| !this.validator.valid(extendUserPhone, "mobile")) {
	            var tip = isEnglish(lang) ? "Enter right phone number" : "请输入合法手机号";
	            $("#UserPhoneErroTip").html(tip).show();
	        }else{
	        	if ($("#GetDynamicCode").attr("useful") == "true") {
	                var validateCode = "";
	                if ($("div#VCodeDiv").is(":visible")) {
	                    validateCode = $("#ValidateCode_Dynamic").val();
	                }

	                $.ajax({
	                	type:'POST',
    					url:'/passport/ajax/getDynamicCode',
    					data:"phone="+extendUserPhone+"&validateCode="+validateCode+"&ConstID="+that.ConstID,
    					success:function(data){
							//alert(data.message);
    						if(data.isShowVerifyCode)
    							$("#VCodeDiv").show();

    						switch (data.code) {

    							case "000":

    								function Time(isEn) {
	                                    var left = 60;
	                                    return function () {
	                                        if (left == 0) {
	                                            clearInterval(count);
	                                            var tip = isEn ? "Get password" : "获取动态密码";
	                                            $("#GetDynamicCode").html(tip);
	                                            $("#GetDynamicCode").attr("useful", "true");
	                                            $("#GetDynamicCode").attr("class", "btn");
	                                            left = 60;
	                                        }
	                                        else {
	                                            if (!isEn) {
	                                                $("#GetDynamicCode").html(left + "秒后重新发送");
	                                            }
	                                            else {
	                                                $("#GetDynamicCode").html("Resend " + left + " s");
	                                            }
	                                            left--;
	                                        }
	                                    }

                                	};

                                	 if ($("#GetDynamicCode").attr("useful") == "true") {
                                         var cc = Time(isEnglish(lang));
                                         $("#GetDynamicCode").attr("useful", "false");
                                         $("#GetDynamicCode").attr("class", "btn rebtn");
                                         var count = setInterval(function () { cc(); }, 1000);
                                     }

									//成功
									break;
								case "100":
									 var tip = isEnglish(lang) ? "Sorry, your phone numbe is  binding more than one elong account, not support the mobile sign in, please try" + "<a href=\"#\" method=\"NormalLoginLink\">normal sign in</a>" : "对不起，您的手机号绑定多个艺龙账号，暂不支持手机动态密码登录，请使用" + "<a href=\"#\" method=\"NormalLoginLink\">普通登录方式</a>";
		                                $("#UserPhoneErroTip").html(tip).show();
		                                if ($("#VCodeDiv").is(":visible")) {
		                                	getVcode($("img[method='ChangeVidateCode']"));
		                                }
									break;
								case "101":
									 var tip = isEnglish(lang)  ? "Your mobile phone number has not been registered. Please login in after " + "<a href=\"register_en.html\">registration</a>" : "当前手机未注册，请 " + "<a href=\"register_cn.html\">注册</a>";
		                                $("#UserPhoneErroTip").html(tip).show();
		                                if ($("#VCodeDiv").is(":visible")) {
		                                    getVcode($("img[method='ChangeVidateCode_Dynamic']"))
		                                }
									break;
								case "719":
								case "102":
									if (!isEnglish(lang)) {
	                                    var tip = "您已达到今天获取动态密码的最高次数，请使用" + "<a href=\"#\" method=\"NormalLoginLink\">普通登录方式</a>";
	                                    $("#UserPhoneErroTip").html(tip).show();
	                                }
	                                else {
	                                    var tip = "You have to take the maximum number of dynamic password today，please try " + "<a href=\"#\" method=\"NormalLoginLink\">normal sign in</a>";
	                                    $("#UserPhoneErroTip").html(tip).show();
	                                }
	                                if ($("#VCodeDiv").is(":visible")) {
	                                    getVcode($("img[method='ChangeVidateCode_Dynamic']"));
	                                }
									break;
								case "103":
								case "104":
	                                var tip = isEnglish(lang) ? "Verification code sent failure" : "验证码发送失败";
	                                $("#UserPhoneErroTip").html(tip).show();
	                                if ($("#VCodeDiv").is(":visible")) {
	                                    getVcode($("img[method='ChangeVidateCode_Dynamic']"))
	                                }
									break;
								case "106":
									 var tip = isEnglish(lang) ? "Repeated requests,try again later" : "重复请求，稍后再试";
		                             $("#UserPhoneErroTip").html(tip).show();
		                             if ($("#VCodeDiv").is(":visible")) {
		                                 getVcode($("img[method='ChangeVidateCode_Dynamic']"))
		                             }
									break;
								case "704":
									$("#validateResult").show();
									if ($("#VCodeDiv").is(":visible")) {
                                		getVcode($("img[method='ChangeVidateCode_Dynamic']"))
                                	}
									break;
								case "334":
									var tip = isEnglish(lang) ? "Your request is too frequent. Please try again later" : "您的请求过于频繁，请稍后再试";
									$("#UserPhoneErroTip").html(tip).show();
									if ($("#VCodeDiv").is(":visible")) {
										getVcode($("img[method='ChangeVidateCode_Dynamic']"))
									}
									break;
								case "333":
									var tip = isEnglish(lang) ? "The IP request has reached its highest number" : "IP请求已到最高次数，请更换其他登录方式";
									$("#UserPhoneErroTip").html(tip).show();
									if ($("#VCodeDiv").is(":visible")) {
										getVcode($("img[method='ChangeVidateCode_Dynamic']"))
									}
									break;
								default:
									$("#validateResult").show();

									$("#UserPhoneErroTip").html(data.message).show();
									if ($("#VCodeDiv").is(":visible")) {
										getVcode($("img[method='ChangeVidateCode_Dynamic']"))
									}
									break;
							}
    					}

	                });

	        	}
	        }
		},

		//选择二维码登录
		qrCodeLogin : function(event){
			var element = E.event.element(event);
			var method = element.attr("method");
			var sessionGuid;
			switch(method){
			case "QrCodeLogin":

				if(existGuid){

					//弹出对话框
					var dialog = new D.dialog({
						title: "温馨提示",
                        htmlContent: '<div class="tipBox"><p style="margin-top:15px;width:290px;text-align:center;" class="tl">出错啦，请点击刷新后重试。</p></div>',
                        height: 100,
                        width: 300,
                        DialogEvent: function(wins) {
                        	wins.bind("click",function(){
                        		window.location.reload();
                        	})
                        }
					});
					dialog.show();
					return false;
				}

				$("#NoCodeLogin").hide();
                $("#ScanTimeout2").hide();
                $("#CodeLogin").show();
                $("#SearchCodeStep").show();
//                this.getQrCode(sessionGuid);
                $(".a_one").attr("style", "top: -50px; left: -50px;");
                $(".a_two").attr("style", "top: -50px; left: 0px;");

                var startTime = new Date();
                var requestContent=0;
                //二维码轮询
                ajaxPolling(startTime, requestContent);
				break;

			case "NormalLogin":
				$("#NoCodeLogin").show();
                $(".a_one").attr("style", "top: 0px; left: 0px;");
                $(".a_two").attr("style", "top: 0px; left: 50px;");
                $("#CodeLogin").css("display", "none").find("div .scanning_code").css("display", "none");
                $("#ScanTimeout2").hide();
				break;

		}

		return false;
		},

		//正常登录事件响应
		onClickElongLogin : function (event){
			var that = this;
			if(event.keyCode==13){
				this.normalLogin.find("a[method='LoginSubmit']").click();
				return ;
			}

			var element = E.event.element(event);
			var method = element.attr("method");
			hideErrorTip();
			switch (method){
				case "LoginSubmit":
					if(!this.validateLogin())
						return false;
					this.WirteLoginCookie();

					if ($("a[method='LoginSubmit']").attr("usable") == "true")
                        $("a[method='LoginSubmit']").attr("usable", "false");
                    this.normalLogin.find("a[method='LoginSubmit']").html(isEnglish(lang) ? "Sign in ..." : "登录中…");


					var validateCode = this.validateCode.val();
					var userName = this.UserName.val();
					var passwd = this.PassWord.val();
					var remeberMe = false;
					//记住我
					if ($("span#pageinputRememberMe").attr("class").toLowerCase().indexOf("off") != -1) {
                        remeberMe = true;
                    }
                    var token = window.fingerPrintToken || ''
                    //console.log(token+"---"+level)

					$.ajax({
						type:'POST',
						url:'/passport/ajax/elongLogin',
						data:{
							'userName':userName,
							'passwd':passwd,
							'validateCode':validateCode,
							'rememberMe':remeberMe,
							'token':token,
							'loginLevel':level,
							'ConstID': that.ConstID,
                            'nexturl':nextUrl
						},

						success:function(data){
                            //console.log(data)
                            $("a[method='LoginSubmit']").attr("usable", "true");
                            if(data.success){
                                $("a[method='LoginSubmit']").unbind("click");
                                $("a[method='LoginSubmit']").unbind("keydown");
                                var esid = data.esid;
                                //中英文互通
                                //window.location.href = "http://my.elong.com/Connection_cn.html?esid=" +data.esid+ "&nextUrl=" + nextUrl + "&rememberMe="+remeberMe;
                                //测试代码
                                //nextUrl = "http://mmyelong.elong.com:8080/me_personalcenter_cn";
                                loginTc(data, function () {
                                    connentionEN(data.esid,nextUrl,remeberMe)
                                });
							}else{
                                //展示验证码
                                if(data.isShowVerifyCode){
                                    $("#ValidateCodeDiv").show();
                                }
                                //解析中英文错误文案
                                var cnMSG = data.message.split("@")[0];
                                var enMSG = data.message.split("@")[1];
                                switch(data.code){
                                    case "704":
                                        $("#validate_result").show();
                                        if($("#ValidateCodeDiv").is(":visible")) {
                                            getVcode($("img[method='ChangeVidateCode']"))
                                        }
                                        $("a[method = 'LoginSubmit']").html(isEnglish(lang) ? "Sign in " : "登录");
										break;
									case "402":


                                        $("#VCodeDiv").show();
                                        var tip = isEnglish(lang) ? enMSG : cnMSG;
                                        $("#validate_result").html(tip).show();
                                        $("a[method = 'LoginSubmit']").html(isEnglish(lang) ? "Sign in " : "登录");
                                        getVcode($("img[method = 'ChangeVIdateCode']"))
                                        break;
									case "403":
                                         $("#ElongLogin").hide();
                                         $("#NoCodeLogin").attr("class", "formbox phonebox errorBox");
                                        $("a[method='DynamicLoginSubmit']").attr("usable", "true");
                                        var tip = isEnglish(lang) ? enMSG : cnMSG;
                                        $("#UserPhoneErroTip").html(tip).show();

                                        $("#DynamicLogin").show();
                                        $("#LoginTypeChoose").hide();

                                        $("a[method = 'DynamicLoginSubmit']").html(isEnglish(lang) ? "Sign in " : "登录");
                                        $("a[method='LoginSubmit']").html(isEnglish(lang) ? "Sign in" : "登录");
                                        getVcode($("img[method='ChangeVidateCode_Dynamic']"))
                                        getVcode($("img[method='ChangeVidateCode']"))

                                        break;
									case "404":
                                        $("a[method='DynamicLoginSubmit']").attr("usable", "true");
                                        var tip = isEnglish(lang) ? enMSG : cnMSG;

                                        showErrorTip($("#UserName"),tip);
                                        $("#UserPhoneErroTip").html(tip).show();
                                        $("a[method='LoginSubmit']").html(isEnglish(lang) ? "Sign in" : "登录");
                                        $("a[method = 'DynamicLoginSubmit']").html(isEnglish(lang) ? "Sign in " : "登录");
                                        getVcode($("img[method = 'ChangeVIdateCode']"))
                                        break;
                                    default :
                                        var content = isEnglish(lang) ? enMSG : cnMSG;
                                        showErrorTip($("#UserName"),content);
                                        if($("#ValidateCodeDiv").is(":visible")) {
                                            getVcode($("img[method = 'ChangeVIdateCode']"))
                                        }
                                        $("a[method='LoginSubmit']").html(isEnglish(lang) ? "Sign in" : "登录");
                                        break;
                                }

                            }
					 	}
					 });
					
					break;
				case "HrefVlidateCode":
					getVcode($("img[method='ChangeVidateCode']"));
					break;
				case "ChangeVidateCode":
					getVcode($("img[method='ChangeVidateCode']"));
					break;
				case "HrefVlidateCode":
					getVcode($("img[method='ChangeVidateCode']"));
					break;
				case "CheckValidateCode":
					var code = element.val();
					if(code.indexOf("验证码")>-1 || code.indexOf("Security")>-1)
						element.attr("value","")
					
					$("#validate_result").show();
	                if ($("#validate_result").is(":visible")) {
	                    $("#validate_result").hide();
	                }
					break;
				
				case "ValidateUserName":
					var userName = element.val();
					if(userName.indexOf("卡号")>-1 || userName.indexOf("Card number")>-1)
						element.val("");
					break;
				case "ValidatePassword":
					$("#password_tip").hide();
	                $("#input_password").show();
	                $("#input_password").find("input").focus();
					break;
				case "hrefFindPassWord" :
					var url = "/passport/ForgetPass_"+lang+".html"; 
					var userName = this.UserName.val();
					if(E.validate.valid(userName,"notEmpty") && !(userName.indexOf("卡号")>-1 || userName.indexOf("Card number")>-1)){
						userName = userName.replace("_", "$");
					}
					window.location.href = url+"?loginname="+userName;
					break;
				case "hrefSina":
                    var url = "http://openapi.elong.com/sina.html";
                    window.location.href = url;
                    break;
	            case "hrefQQ":
	                var url = "http://openapi.elong.com/qq.html";
	                window.location.href = url;
	                break;
	            case "hrefWeixin":
	                var url = "http://openapi.elong.com/weixin.html";
	                window.location.href = url;
	                break;
	            case "hrefAlipay":
	                var url = "http://openapi.elong.com/alipay.html";
	                window.location.href = url;
	                break;
	            case "hrefRenRen":
	                var url = "http://openapi.elong.com/renren.html";
	                window.location.href = url;
	                break;
					
			}
		},
		//动态登录校验
		dynamicValidateLogin :function(){
			var userPhone = $("#userPhone").val();
	        var phoneType = $("#PhoneType").attr("value");
	        var extendUserPhone;
	        if (phoneType == "1" || phoneType == "5") {
	            extendUserPhone = userPhone;
	        }
	        if (phoneType == "2" || phoneType == "6") {
	            extendUserPhone = "852" + userPhone;
	        }
	        if (phoneType == "3" || phoneType == "7") {
	            extendUserPhone = "853" + userPhone;
	        }
	        if (phoneType == "4" || phoneType == "8") {
	            extendUserPhone = "886" + userPhone;
	        }
	        
	        if (isNullOrEmpty(userPhone) || (!this.validator.valid(extendUserPhone, "mobile"))) {
	            var tip = isEnglish(lang) ? "Enter right phone number" : "请输入合法手机号";
	            $("#UserPhoneErroTip").html(tip).show();
	            return false;

	        }
	        
	        if (userPhone == "请输入手机号" || userPhone == "pleasr enter your phone number") {
	            var tip = isEnglish(lang) ? "Enter right phone number" : "请输入手机号";
	            $("#UserPhoneErroTip").html(tip).show();
	            return false;
	        }
	        
	        var dynamicCode = $("input[method='ValidateDynamicCode']").val();
	        if (isNullOrEmpty(dynamicCode) || dynamicCode == "输入动态密码" || dynamicCode == "Enter Dynamic password") {
	            var tip = isEnglish(lang) ? "please enter dynamic password" : "请输入动态密码";
	            $("#DynamicCodeErroTip").html(tip).show();
	            return false;
	        }
	        
	        if ($("#VCodeDiv").is(":visible")) {
	            var validateCode = $("input[method='CheckValidateCode_Dynamic']").val();
	            if (isNullOrEmpty(validateCode) || validateCode == "验证码" || validateCode == "Security code") {
	                var tip = isEnglish(lang) ? "please enter Security code" : "请输入验证码";
	                $("#validate_result_Dynamiic").html(tip).show();
	                return false;
	            }
	        }
	        
	        return true;
		},
		
		//普通登录信息校验
		validateLogin : function(){
			hideErrorTip();
			
			 if(!E.validate.valid(this.UserName.val(),"notEmpty") || this.UserName.val().indexOf("手机号")>-1 ||this.UserName.val().indexOf("account")>-1){
				var content = "cn"==this.language?"请输入账户名":"Please input your account";
				showErrorTip(this.UserName,content);
				 return false;
			 }
			 if (!$("#input_password").is(":visible")) {
				var content = isEnglish(lang)?"Please input your password" : "请输入密码";
		        showErrorTip($("input[method='ValidatePassword']"), content);
		        return false;
		     }else if(""==this.PassWord.val() || this.PassWord.val().indexOf("Password")>-1 ||this.PassWord.val().indexOf("密码")>-1){
		    	 var content = isEnglish(lang)?"Please input your password" : "请输入密码";
			     showErrorTip($("input[method='ValidatePassword']"), content);
			     return false;
		     }
			 if($("#ValidateCodeDiv").is(":visible")){
				 if(""==this.validateCode || this.validateCode.val().indexOf("Security")>-1 ||this.validateCode.val().indexOf("验证码")>-1){
			    	 
			    	 var content = isEnglish(lang)?"Please input your Security code" : "请输入验证码";
				     showErrorTip($("input[method='CheckValidateCode']"), content);
				     return false;
				 }
			 }
			 
			 return true;
		},
		
	    //写cookie
	    WirteLoginCookie: function (){
	    	if (null!=this.UserName.val()||""==this.UserName) {
	            var options = { expires: 60 };
	            E.cookie.set("member", "", this.UserName.val(), options);
	        }
	    },
	    
	    //校验字符串是否是空
	    isEmpty : function (content){
			if(null==content || ""==content)
				return true;
			return false;
		},
		
		//记住我
		clickRememberMe : function (event){
			
			var element = E.event.element(event);
			var iconType = element.attr("class");
			switch (iconType) {
	        case "icon on":
	        	element.attr("class", "icon off")
	            break;
	        case "icon off":
	        	element.attr("class", "icon on")
	            break;
	    }
			
		},
		
		//刷新二维码
	    refreshQrCode : function (){
			var element = $("a[method='RefreshQrCode']");
			$("#SearchCodeStep").show(); //隐藏扫码登陆
	        $("#ScanTimeout2").hide(); //显示未扫码超时提示
	        var startTime = new Date();
	        var requestContent=0;
	        ajaxPolling(startTime, requestContent);
		},
		
		//展示使用帮助
		showHelp : function (event){
			var element = $("a[method='showHelp']");
			
			function showLastAnimate() {
	            if (element.parent().prev().find("div").eq(0).is(":animated")) { } else {
	                element.parent().prev().find("div").eq(0).fadeIn(150, function () { });
	            }
	        }
	        function showMidAnimate() {
	            if (element.parent().prev().is(":animated")) { } else {
	                element.parent().prev().fadeIn(35, function () { }).animate({ left: "85px" }, 70, function() {showLastAnimate();});
	            }
	        }
	        showMidAnimate();
		},
		
		//关闭使用帮助展示
		closeHelp : function (event){
			
			 var element = $("a[method='showHelp']");
			
			 function closeLastAnimate() {
	             if (element.parent().prev().is(":animated")) {} else {
	                 element.parent().prev().animate({ left: "0px" }, 70, function () { element.parent().prev().fadeOut(35, function() {}); });
	             }
	         }
	         function closeMidAnimate() {
	             if (element.parent().prev().find("div").eq(0).is(":animated")) {} else {
	                 element.parent().prev().find("div").eq(0).fadeOut(150, function() {
	                     closeLastAnimate();
	                 });
	             }
	         }
	         closeMidAnimate();
		},
		
//		hideErroTip_Dynamic: function () {
//	        $("#UserPhoneErroTip").hide();
//	        $("#DynamicCodeErroTip").hide();
//	        $("#validate_result_Dynamiic").hide();
//
//	    },
		
		//
		LeaveLoginAreaClick : function(event){
			var element = E.event.element(event);
			var method = element.attr("method");
			var value = element.val();
			switch (method) {
				case "ValidateUserName":
					$("input[name='accounterrortip']").hide();
	                if (value == '' || value == null) {
	                    var username = isEnglish(lang) ? "User name / Card number / Email" : "用户名/卡号/手机号/邮箱";
	                    $("input[method='ValidateUserName']").val(username)
	                }
	                break;
				case "PassWord":
	                if (value == '' || value == null) {
	                    $("div#input_password").hide();
	                    $("div#password_tip").show();
	                }
	                break;
				case "CheckValidateCode":
					
//	                if (value == '' || value == null) {
//	                    var username = isEnglish(lang) ? "Security code" : "验证码";
//	                    $("input[method='CheckValidateCode']").val(username);
//	                }
	                break;
			}
		},
		LeaveDynamicLoginAreaClick : function(event){
			var element = E.event.element(event);
			var method = element.attr("method");
			var userPhone = element.val();
			hideErrorTipDynamic();
			switch (method) {
            case "ValidateUserPhone":
                var extendUserPhone;
                var phoneType = $("#PhoneType").attr("value");
                if (phoneType == "1" || phoneType == "5") {
                    extendUserPhone = userPhone;
                }
                if (phoneType == "2" || phoneType == "6") {
                    extendUserPhone = "852" + userPhone;
                }
                if (phoneType == "3" || phoneType == "7") {
                    extendUserPhone = "853" + userPhone;
                }
                if (phoneType == "4" || phoneType == "8") {
                    extendUserPhone = "886" + userPhone;
                }


                if (userPhone == '' || !this.validator.valid(extendUserPhone, "mobile")) {
                    var userPhone = isEnglish(lang) ? "please enter your phone number" : "请输入手机号";
                    $("input[method='ValidateUserPhone']").val(userPhone);
                    var tip = isEnglish(lang) ? "Enter right phone number" : "请输入合法手机号";
                    $("#UserPhoneErroTip").html(tip).show();
                }
                break;

            case "CheckValidateCode_Dynamic":
                var value = $("#ValidateCode_Dynamic").val();
                if (value == '' || value == null) {
                    var username = isEnglish(lang) ? "Security code" : "验证码";
                    $("input[method='CheckValidateCode_Dynamic']").val(username);
                }
                break;
            case "ValidateDynamicCode":
            	var value = $("#input_DynamicCode").val();
                if (value == '' || value == null) {
                    var dynamicCode = isEnglish(lang) ? "Enter Dynamic password" : "输入动态密码";
                    $("input[method='ValidateDynamicCode']").val(dynamicCode);
                }
                break;
			}
		},
		
		getQrCode : function(sessionGuid){
			var elment = $("qrImg");
			var url = "/passport/qrCode?sessionGuid="+sessionGuid+"?"+Math.random();
			element.attr("src",url);
		},
		checkMobile:function(mobile){
			var reg= /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/;
			if(reg.test(mobile)){
				return true;
			}else{
				return false;
			}
		}
	
	});
	
	new login;
	
	//登录时用户未绑定手机号提示语
	$(".mt20").hover(function(){
		$(".bind-phonetip").show();
	},function(){
		$(".bind-phonetip").hide();
	});
	
	//中英文互通
	function connentionEN(esid,nextUrl,remeberMe){
        if(remeberMe)
            expireTime=1;
        else
            expireTime=0;
		
		// window.location.href=nextUrl;
		window.location.href = "http://my.elong.com/Connection_cn.html?SessionTag="+esid+"&nextUrl=" + encodeURIComponent(nextUrl) + "&expireTime="+expireTime;
	}

    function loginTc(data, fn) {
        var iframe = $('<iframe id="xFrame" src="about:blank" style="display:none;"></iframe>');
        var tcUser = JSON.parse(E.cookie.get("tcUser") || '{}');
        var param = {
            memberIdStr: tcUser.MemberId,
            AccessToken: tcUser.AccessToken,
            Lgid: data.lgId
        };
        var url = '//m.ly.com/passport/login/SetELongCookie?' + jQuery.param(param);
        iframe.attr("src", url);
        iframe.appendTo('body');

        iframe.on('load',function () {
        	fn();
        });
    }
	
	//提示填写账号
	function showErrorTip (element,content) {
		element.after("<div class=\"input_tip\" name=\"input_error_tip\">"+content+"</div>");
    }
    
    //隐藏错误提示
    function hideErrorTip() {
    	$("div[name='accounterrortip']").hide();
        $("div[name='input_error_tip']").hide();
        $("#validate_result").hide();
    }
    
    //隐藏动态登录错误提示
    function hideErrorTipDynamic() {
    	$("#validateResult").hide();
    	$("#DynamicCodeErroTip").hide();
    	$("#UserPhoneErroTip").hide();
    }
	
	//二维码轮询
	function ajaxPolling(startTime,requestContent){
		var ajaxPollingInterval = window.setInterval(function(){
			if(parseInt(DateDiff("s", new Date(), startTime))>180){
				//清楚轮询
				window.clearInterval(ajaxPollingInterval);
				//隐藏扫码登录
				$("#SearchCodeStep").hide();
				$("#ScanSuccess").hide();
				//显示未扫描超时
				$("#ScanTimeout2").show();
			}else{
				//正常登录隐藏，发送异步请求
				if (!$("#NoCodeLogin").is(":visible")) {
					$.ajax({
						type:'GET',
						url:'/passport/ajax/getQRCodeStatus',
						success:function(data){
							if(data.status=="0"){//未进行扫码
								//去判断此时用户是否点击了普通登录
                                if ($("#NoCodeLogin").is(":visible")) {//用户切换到了普通登录,终止此时的轮询
                                    window.clearInterval(ajaxPollingInterval);
                                }
							}else if(data.status=="1"){//扫码成功
								if ($("#NoCodeLogin").is(":visible")) {//此时用户取消了扫码登陆，回到正常登陆态
                                    window.clearInterval(ajaxPollingInterval);
                                    $("#CodeLogin").css("display", "none").find("div .scanning_code").css("display","none");
                                } else {
                                    $("#CodeLogin").css("display", "block");
                                    $("#ScanSuccess").css("display", "block").prevAll("div").eq(0).css("display", "none");
                                }
							}else if(data.status=="2"){//登陆成功
								window.clearInterval(ajaxPollingInterval); //清除当前的轮询
								//写登录态
								$.ajax({
									type:'GET',
									url:'/passport/ajax/qrCodeLogin',
									success:function(data){
										if(data.status==true){
											if(null==nextUrl)
												nextUrl="http://my.elong.com/index_cn.html";
											//中英文互通
//											window.location.href = "http://my.elong.com/Connection_cn.html?esid="+data.esid+"&nextUrl=" + nextUrl + "&rememberMe=false";
                                            loginTc(data, function () {
                                                connentionEN(data.esid,nextUrl,false);
                                            });
										}
									}
								});
								
							}else if(data.status=="3"){//取消扫码
								 window.clearInterval(ajaxPollingInterval); //清除轮询
	                             $("#CodeLogin").css("display", "none").find("div .scanning_code").css("display", "none");
	                             $("#NoCodeLogin").css("display", "block");
	                             $(".a_one").attr("style", "top: 0px; left: 50px;");
	                             $(".a_two").attr("style", "top: 0px; left: 0px;");
							}
						} 
					});
				}else{
					window.clearInterval(ajaxPollingInterval);
				}
			}
		},2000)
	}
	
	function getVcode(element){
		var imgUrl = getCodeUrl();
		$('#ValidateCodeDiv img').attr("src", imgUrl);
		$('#VCodeDiv img').attr("src", imgUrl);
		// element.attr("src",getCodeUrl());
	}
	function getCodeUrl(){
		return "/passport/getValidateCode?"+Math.random();
	}
	
	//记住我
	function clickRememberMe(event){
		var element = event.toElement;
		var iconType = element.attributes["class"];
		
		switch (iconType.value) {
        case "icon on":
        	$("#pageinputRememberMe").attr("class", "icon off")
            break;
        case "icon off":
        	$("#pageinputRememberMe").attr("class", "icon on")
            break;
		}
		
	}
	function isNullOrEmpty(content){
		if(content==null || content=="")
			return true;
		return false;
	}
	
	function isEnglish (language){
		if("en"==language)
			return true;
		return false;
	}

	
	//取得两个日期之间的时间差  add by 张鸿
	//参数：interval : y或year-表示取得相差的年份 n或month-表示相差的月份 d或day表示相差的天数 h或hour-表示相差的小时 m或minute-表示相差的分钟 
	//	               s或second-表示相差的秒数 ms或msecond-表示相差的毫秒数 w或week-表示相差的周数
	//	    date1:起始日期
	//	    date2:结束日期
	function DateDiff(interval, date1, date2) {
	    var TimeSpan1 = new TimeSpan(date1);
	    var TimeSpan2 = new TimeSpan(date2);
	    var result;
	    switch (String(interval).toLowerCase()) {
	        case "y":
	        case "year":
	            result = TimeSpan1.year - TimeSpan2.year;
	            break;
	        case "n":
	        case "month":
	            result = (TimeSpan1.year - TimeSpan2.year) * 12 + (TimeSpan1.month - TimeSpan2.month);
	            break;
	        case "d":
	        case "day":
	            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day)) / (1000 * 60 * 60 * 24));
	            break;
	        case "h":
	        case "hour":
	            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day, TimeSpan1.hour) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day, TimeSpan2.hour)) / (1000 * 60 * 60));
	            break;
	        case "m":
	        case "minute":
	            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day, TimeSpan1.hour, TimeSpan1.minute) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day, TimeSpan2.hour, TimeSpan2.minute)) / (1000 * 60));
	            break;
	        case "s":
	        case "second":
	            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day, TimeSpan1.hour, TimeSpan1.minute, TimeSpan1.second) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day, TimeSpan2.hour, TimeSpan2.minute, TimeSpan2.second)) / 1000);
	            break;
	        case "ms":
	        case "msecond":
	            result = Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day, TimeSpan1.hour, TimeSpan1.minute, TimeSpan1.second, TimeSpan1.msecond) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day, TimeSpan2.hour, TimeSpan2.minute, TimeSpan2.second, TimeSpan1.msecond);
	            break;
	        case "w":
	        case "week":
	            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day)) / (1000 * 60 * 60 * 24)) % 7;
	            break;
	        default:
	            result = "invalid";
	    }
	    return (result);
	}
	
	//兼容IE8下的日期计算
	function parseISO8601(dateStringInRange) {
	    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
	        date = new Date(NaN), month,
	        parts = isoExp.exec(dateStringInRange);

	    if (parts) {
	        month = +parts[2];
	        date.setFullYear(parts[1], month - 1, parts[3]);
	        if (month != date.getMonth() + 1) {
	            date.setTime(NaN);
	        }
	    }
	    return date;
	}
	//取得指定日期的年月日时分秒   
	//参数：dateValue 是格式形如：2014/07/02    add by 张鸿
	function TimeSpan(dateValue) {
	    var newCom = new Date(dateValue);
	    this.year = newCom.getFullYear();
	    this.month = newCom.getMonth() + 1;
	    this.day = newCom.getDate();
	    this.hour = newCom.getHours();
	    this.minute = newCom.getMinutes();
	    this.second = newCom.getSeconds();
	    this.msecond = newCom.getMilliseconds();
	    this.week = newCom.getDay();
	}
	
})