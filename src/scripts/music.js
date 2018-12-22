
	define(["jquery","common","swiper"],function($,com,swiper){
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
			$(".txt").on("input",function(){
				$(".list-cont").html();
				$.ajax({
					type:"get",
					url:`http://suggestion.baidu.com/su?wd=${$(this).val()}`,
					dataType:"jsonp",
		//			jsonpCallback:"cbk",
					jsonp:"cb",
					success:function(json){
						$(".list-cont").html("");
						var $word=json.s;
						$.each($word,function(index,item){
							var $li=$("<li>");
							var $a=$("<a>");
							$a.html(item);
							$li.append($a);
							$(".list-cont").append($li);
						}) 
						$(".list-cont").children().hover(function(){
							console.log($(this).children().html());
							$(".txt").val($(this).children().html());
						})
						
					}
				})
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
	  	var bannerS = $("#banner .swiper-container")
	  	var myswiper = new swiper('#banner .swiper-container',{
	  		autoplay: true,
    		loop : true,
    		pagination: {
    			el: '.swiper-pagination',
    			clickable :true,
  			},
  			navigation: {
      			nextEl: '#banner .swiper-button-next',
      			prevEl: '#banner .swiper-button-prev',
    		},
  		})
	  	bannerS.hover(function(){
	  		myswiper.autoplay.stop();
	  		$(".swiper-button-prev").show();
	  		$(".swiper-button-next").show();	
	  	},function(){
	  		myswiper.autoplay.start();
	  		$(".swiper-button-prev").hide();
	  		$(".swiper-button-next").hide();
	  	})
	  	$("#banner .swiper-button-prev").hover(function(){
			$(".swiper-button-prev").css("background-position","0 -72px")
	  	},function(){
			$(".swiper-button-prev").css("background-position","0 0")
	  	})
	  	$("#banner .swiper-button-next").hover(function(){
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
})