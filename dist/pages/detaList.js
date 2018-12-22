require(["../scripts/config.js"],function(){
	require(["jquery","common","swiper","_cookie","cookies","_public"],function($,com,swiper,cookies,cookie){	
		$(function(){
			//商品小图轮播
			var swiper1 = new swiper('.goodssmallbox', {
			    slidesPerView:4,
			    spaceBetween: 0,
			    freeMode: true,
	    		navigation: {
				  nextEl: '.right_button',
				  prevEl: '.left_button',
				},
	  		});
		// 点击每一个上面图片变换
		var imgChan=document.querySelector(".pic_bg img");
		var swipers=Array.from(document.querySelectorAll(".goodssmallbox_pic .swiper-slide"));
		var bigbox_bg=document.querySelector(".bigbox_bg")
		swipers.forEach(function(item,index){
			item.onclick=()=>{
				imgChan.src=item.children[0].src;
				bigbox_bg.src=item.children[0].src;
			}
		})
		//右侧轮播图
		var swiper1 = new swiper('.temWrapbox', {
			 	direction: 'vertical', // 垂直切换选项
    			loop: true, 
	    		navigation: {
				  nextEl: '.next',
				  prevEl: '.pre',
				},
	  });
	  	//相关推荐请求数据
		$.ajax({
			url:"../scripts/json-data/about.json",
			success:function(data){
				var imgs=$(".temWrapbox .swiper-slide img");
				var boxgoods=$(".temWrapbox .swiper-slide .box .boxgoods")
				var str="";
				$.each(imgs,function(index){
					imgs.eq(index).attr("src",data[index].image1);
				})
			}
		})
		//点击加减
//		var c_sub=document.querySelector(".c_sub");
//		var c_add=document.querySelector(".c_add");
//		var txt1=document.querySelector(".txt1");
//		var c_inventory=document.querySelector(".c_inventory");
//		c_add.onclick=function(){
//			 txt1.value++; 
//			 if(txt1.value > parseInt(c_inventory.innerHTML)){
//			 	alert("库存不够");
//			 	txt1.value=c_inventory.innerHTML;
//			 }
//		}
//		c_sub.onclick=function(){
//			 txt1.value--;
//			 if(txt1.value<1){
//			 	alert("数量不能小于1");
//			 	txt1.value=1
//			 }
//		}
		//放大镜
		//小tupian:pic_bg
		//移动框:smarbox  width/小框width=大框/大图width
		//大外框：smallK
		//大图片 bigbox_b
	
		$(".pic_bg").hover(function(){
			$(".smarbox").show();
			$(".smallK").show();
		}, function(){
			$(".smarbox").hide();
			$(".smallK").hide();
		})
		$(".smarbox").width( $(".smallK").width()/$(".bigbox_bg").width()*$(".pic_bg").width() );
		$(".smarbox").height( $(".smallK").height()/$(".bigbox_bg").height()*$(".pic_bg").height() );
		$(".pic_bg").mousemove(function(e){
			var _left=e.pageX-$(".pic_bg").offset().left-$(".smarbox").width()/2;
			var _top=e.pageY-$(".pic_bg").offset().top-$(".smarbox").height()/2;
			$(".smarbox").css({
				"left":Math.min(Math.max(0,_left),$(".pic_bg").width()-$(".smarbox").width()),
				"top":Math.min(Math.max(0,_top),$(".pic_bg").height()-$(".smarbox").height()),
			})
			$(".bigbox_bg").css({
				left:-$(".smarbox").position().left*$(".bigbox_bg").width()/$(".pic_bg").width(),
				top:-$(".smarbox").position().top*$(".bigbox_bg").height()/$(".pic_bg").height(),
			})
		})
		//
		$(".detailBox_title p").click(function(){
			$(this).addClass("cur").siblings().removeClass("cur")
		})

			class Detalist{
				constructor(options){
					this.url = options.url;
					this.addToCart = options.addToCart;
					this.c_add=options.c_add;
					this.c_sub=options.c_sub;
					this.getCookie()
					this.load();
				}
				getCookie(){
					this.goodDetalist = $.cookie("goodLists");
				}
				load(){
					var that = this;
					$.ajax({
						url:this.url,
						success:function(res){
							that.res = res;
							that.display();
						}
					})
				}
				display(){
					$.each(this.res, (key,item)=>{
							if(item.id == this.goodDetalist){
								$(".pic_bg img").attr("src",item.image1);
								$(".addToCart").attr("index",item.id);
				 				$(".smallK img").attr("src",item.image1);
				 				$(".title_info").html(item.title1);
				 				$(".starName").html(item.artistName);
				 				$(".price_cur").html(item.realPrice);
				 				$(".prc").html(50+item.realPrice);
				 				$(".c_account").html(item.favoNum);
				 				$(".picfirst").attr("src",item.image1);
							}
					});
					this.addEvent();
				}
				addEvent(){
					var that = this;
					this.addToCart.on("click",function(){
						that.id = $(this).attr("index");
						that.val = $(this).parentsUntil(".goodsBox_info").siblings(".selectBox").find(".count1").find(".txt1").val();
						console.log(that.val)
						that.setCookie();
						$(location).attr("href","shop.html");
					})
					this.c_add.on("click",function(){
						var ele= $(this).siblings(".txt1").val();
						ele++;
						var value=ele;
						$(this).siblings(".txt1").val(value);
						that.val=$(this).siblings(".txt1").val();
					})
					this.c_sub.on("click",function(){
						var ele = $(this).siblings(".txt1").val();
						if(ele<=1){
							value=1;
						}else{
							ele--;
						}
						var value=ele;
						$(this).siblings(".txt1").val(value);
						that.val=$(this).siblings(".txt1").val()
					})
				}
				setCookie(callback){
					this.goods= JSON.parse($.cookie("goods")) || [];
					if(this.goods.length < 1){
						this.goods.push({
							id:this.id,
							count:this.val
						})
					}else{
						var that = this;
						var onOff = true;
						$.each(that.goods,function(index,value){
							if(value.id == that.id){
								that.goods[index].count=+ that.goods[index].count + +that.val;
								onOff = false	
							}
						})
						if(onOff){
							this.goods.push({
								id:that.id,
								count:that.val
							})
						}
					}
					$.cookie("goods",JSON.stringify(this.goods))
					 console.log(JSON.parse($.cookie("goods")))
					}
			}
			new Detalist({
				url:"../scripts/json-data/goodslist.json",
				addToCart:$(".addToCart"),
				c_sub:$(".c_sub"),
				c_add:$(".c_add")
			})
		
		
		
		
		
		
		
		
		
//		var cookies=document.cookie;
//		var arr=cookies.split("; ");
//		var goodid=[];
//		for(var i=0;i<arr.length;i++){
//			goodid.push(arr[i].split("=")[0]);
//		}
//		$.ajax({
//		 	url:"../scripts/json-data/newshop.json",
//		 	success:function(data){
//		 		for(var i=0;i<data.length;i++){
//		 			if(goodid[goodid.length-1]==data[i].id){
//		 				$(".pic_bg img").attr("src",data[i].image1);
//		 				$(".smallK img").attr("src",data[i].image1);
//		 				$(".title_info").html(data[i].goodsName);
//		 				$(".starName").html(data[i].artistName);
//		 				$(".price_cur").html(data[i].realPrice);
//		 				$(".pre").html(data[i].realPrice);
//		 				$(".c_account").html(data[i].id);
//		 				$(".picfirst").attr("src",data[i].image1);
//						cookies.setCookie(goodid[goodid.length-1],goodid[goodid.length-1],-1);
//		 			}
//		 		}
//		 	}
//		})



		})
	})
})