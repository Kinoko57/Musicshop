require(["../scripts/config.js"],function(){
	require(["jquery","common","swiper","_cookie","_public"],function($,com,swiper,cookie){	
		var myswiper = new swiper('.logincontBox',{
	  		autoplay: true,
    		loop : true,
  		})
		
		//登录验证
		var tels=document.querySelector(".tel");
		var passwords=document.querySelector(".pass");
		var logins=document.querySelector(".login-submit");
		var errors=document.querySelector(".login-error-tips");
		tels.onblur=function(){
			var reg=/^1[0-9]{10}|[0-9a-z]{3,12}@[0-9a-z]{2,4}\.[a-z]{2,4}$/;
			if(reg.test(tels.value)==false){
				errors.innerHTML="格式错误,手机首字母为1,11位，邮箱格式xxx@xxx.xx";
			}else{
				errors.innerHTML="";	
			}
		}
		passwords.onblur=function(){
			var reg=/^[0-9a-zA-Z]{6,20}$/;
			if(reg.test(passwords.value)==false){
				errors.innerHTML="错误提示：数字和字符，6-20位";
			}else{
				errors.innerHTML="";	
			}
		}
		var cookieStr = JSON.parse(cookie.getCookie("register"));
		console.log(cookieStr);
		logins.onclick=function(){
			for(var i=0;i<cookieStr.length;i++){
				if(tels.value == cookieStr[i].name){
					errors.innerHTML="";
					if(passwords.value==cookieStr[i].pass){
						$(location).attr("href","index.html");
					}else{
						errors.innerHTML="密码不正确";
					}
					break;
				}else{
					errors.innerHTML="用户名不存在";
				}
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