require(["../../scripts/config.js"],function(){
	require(["jquery","common","swiper"],function($,com,swiper){


//滑进出现二维码
		$(".erweima").children().hover(function(){  	   
			$(this).find(".sao").slideDown()
	    	$(this).siblings().find(".sao").slideUp();
	  	},function(){
	  		$(this).find(".sao").slideUp();
	  	})
	  	//获取输入框内容，出现下拉框,出现划过的内容
	  	$(".txt").on("focus",function(){
	  		$(".search").css("background-position","0 0");
			$(".list").show();
			$(".list-cont").children().hover(function(){
				console.log($(this).children().html());
				$(".txt").val($(this).children().html());
			})
		})
	  	$(".txt").on("blur",function(){
	  		$(".search").css("background-position","0 -44px");
	  		$(".list").hide();
	  	})
	  	//划过艺人分类出现二级菜单
	  	$(".sort").hover(function(){
	  		$(".select").show();
	  	},function(){
	  		$(".select").hide();
	  	})
	  	//利用swiper banner轮播图，划入出现按钮停止，出现按钮
	  	var myswiper = new swiper('.swiper-container',{
	  		autoplay: true,
    		loop : true,
    		pagination: {
    			el: '.swiper-pagination',
    			clickable :true,
  			},
  			navigation: {
      			nextEl: '.swiper-button-next',
      			prevEl: '.swiper-button-prev',
    		},
  		})
	  	$(".swiper-container").hover(function(){
	  		myswiper.autoplay.stop();
	  		$(".swiper-button-prev").show();
	  		$(".swiper-button-next").show();	
	  	},function(){
	  		myswiper.autoplay.start();
	  		$(".swiper-button-prev").hide();
	  		$(".swiper-button-next").hide();
	  	})
	  	$(".swiper-button-prev").hover(function(){
			$(".swiper-button-prev").css("background-position","0 -72px")
	  	},function(){
			$(".swiper-button-prev").css("background-position","0 0")
	  	})
	  	$(".swiper-button-next").hover(function(){
			$(".swiper-button-next").css("background-position","0 -216px")
	  	},function(){
			$(".swiper-button-next").css("background-position","0 -144px")
	  	})
		
	  //滚动条滚动到某一距离出现回到顶部按钮	
		$(window).scroll(function(){
			var scrollTop=$(this).scrollTop();
			if(scrollTop>=1000){
				$(".return_top").css("display","block");
				$(".return_top").fadeIn(500);
			}else{
				$(".return_top").fadeOut(500);
			}
		})
		$(".return_top").click(function(){
			$("html").animate({scrollTop:0},500)
		})
		
		//登录注册
		$(".login").click(function(){
			$(".dialog").show();
			$(".masklayer").show();
		})
		$(".ico_close").click(function(){
			$(".dialog").hide();
			$(".masklayer").hide();
		})
		$(".login-tab a").click(function(){
			$(this).addClass("login-active").siblings().removeClass("login-active")
			$(".login-main").toggle();
		})
		//登录注册判断	
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
			$(".yanzhengma").html(newst);
		}
		y();
		$(".login-get-code").click(function(){
			y();
		})
		
	})
})