require(["../scripts/config.js"],function(){
	require(["jquery","common","swiper","_cookie","_public"],function($,com,swiper,cookie){	
		
		var myswiper = new swiper('.logincontBox',{
	  		autoplay: true,
    		loop : true,
  		})

	
	//注册	
		var tels=document.querySelector(".tel");
		var passwords=document.querySelector(".password");
		var yanzheng=document.querySelector(".login-text-short");
		var yanzhengma=document.querySelector(".yanzhengma");
		var reginerrors=document.querySelector(".reg-error-tips");
		var regSubmit=document.querySelector(".reginster-submint");
		tels.onblur=function(){
			var reg=/^1[0-9]{10}|[0-9a-z]{3,12}@[0-9a-z]{2,4}\.[a-z]{2,4}$/;
			if(reg.test(tels.value)==false){
				reginerrors.innerHTML="错误提示：13955646456/7352666@qq.com";
				emptys();
			}else{
				reginerrors.innerHTML="";	
			}
		}
		passwords.onblur=function(){
			var reg=/^[0-9a-zA-Z]{6,20}$/;
			if(reg.test(passwords.value)==false){
				reginerrors.innerHTML="错误提示：数字和字符，6-20位";
				emptys();
			}else{
				reginerrors.innerHTML="";	
			}
		}
		yanzheng.onblur=function(){
			if(yanzheng.value!=yanzhengma.innerHTML){
				reginerrors.innerHTML="验证码不正确";
				emptys();
			}else{
				reginerrors.innerHTML="";	
			}
		}
		emptys();
		function emptys(){
			regSubmit.onclick=()=>{
				if(tels.value==""||passwords.value==""||yanzheng.value==""){
					reginerrors.innerHTML="不允许为空";
				}
			}
		}
		//登录注册验证码判断	
		function y(){
			function random(a,b){
				return String.fromCharCode(Math.round(Math.random()*(a-b)+b));
			}
			var str="";
			for(var i=0;i<4;i++){
				var num=parseInt(Math.random()*9);
				var az=random(97,122);
				var Az=random(65,90);
				str=str+num+az+Az;
			}
			var newst="";
			for(var i=0;i<4;i++){
				var y=Math.round(Math.random()*(str.length-1))
				newst+=str[y];
			}
			document.querySelector(".yanzhengma").innerHTML=newst;
		}
		y();
		document.querySelector(".login-get-code").onclick=function(){
			y();
		}
		
		var str=reginerrors.innerHTML;
		if(str.length==0){
			document.querySelector(".reginster-submint").onclick=function(){
				var onOff=true;
				if (cookie.getCookie("register")) {
					var regArr=JSON.parse(cookie.getCookie("register")) 
					for(var i=0;i<regArr.length;i++){
						if(tels.value==regArr[i].name){
							onOff = false;
							reginerrors.innerHTML="用户名已存在";
							break;
						}else{
							reginerrors.innerHTML="";
						}
					}
					if(onOff){
						regArr.push({"name":tels.value,"pass":passwords.value})
						$(location).attr("href","login.html");
					}
				}else{
					var regArr=[];
					regArr.push({"name":tels.value,"pass":passwords.value})
					$(location).attr("href","login.html");
				}
				cookie.setCookie("register",JSON.stringify(regArr),7);
			}
		}
		//点击出现
		$(".area-code-content").click(function(){
			$(".code-list").show();
			$(".code-list li").click(function(){
				$(".country-name").empty()
				$(".country-name").html($(this).text());
			})
			$(".code-list").hover(function(){
				
			},function(){
				$(".code-list").hide();
			})
		})
	})
})