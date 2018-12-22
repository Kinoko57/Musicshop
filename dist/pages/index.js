
require(["../scripts/config.js"],function(){
	require(["jquery","common","swiper","cookies","_public"],function($,com,swiper,cookie){	
	$(function(){
		//top榜 请求数据，
  		$.ajax({
  			url:"../scripts/json-data/list.json",
  			success:function(data){
  				var str="";
				var tabbox=document.querySelector(".tabbox");
				for(var i=0;i<data.length;i++){
					str+=`<div class="box">
						<a href="" class="btns" id="${data[i].id}"><img src="${data[i].image1}" alt="" /></a>
						<p>${data[i].title1}</p>
					</div>`
					tabbox.innerHTML=str;	
				}
  			}
  		})
  		$.ajax({
  			url:"http://shop.yinyuetai.com/goods/listForGood.json?order_snum=true&max_count=8",
  			success:function(json){
  				var str="";
				var goods_chart=document.querySelector(".goods_chart");
				for(var i=0;i<json.data.length;i++){
					str+=`<li>
						<a href="" class="btns" id="${json.data[i].id}">
							<span>${i+1}</span>
							<img src="${json.data[i].imgUrl}" alt="" />
							<div class="info">
								<h4>${json.data[i].goodsName}</h4>
								<p>销量：${json.data[i].sellNum}</p>
							</div>
						</a>
					</li>`
				goods_chart.innerHTML=str;
				}
				$(".artists_title span:first").click(function(){
					$(".artists_chart:first").show();
					$(".goods_chart").hide();
				})
				$(".artists_title span:last-child").click(function(){
					$(".artists_chart:first").hide();
					$(".goods_chart").show();
				})
				for(var j=0;j<3;j++){
					goods_chart.children[j].className="colorful";
				}
  			}
  		})
	  	//top 请求数据
	  	$.ajax({
			url:"http://shop.yinyuetai.com/goods/listForArt.json",
			dataType:"jsonp",
			success:function(json){
				var str="";
				var artists_chart=document.querySelector(".artists_chart");
				for(var i=0;i<json.data.length;i++){
					str+=`<li>
							<a href="" id="${json.data[i].id}">
							<span>${i+1}</span>
							<img src="${json.data[i].artistImg}" alt="" />
							<div class="info">
								<h4>${json.data[i].artistName}</h4>
								<p>销量：${json.data[i].sellNum}</p>
							</div>
						</a>
					</li>`
					artists_chart.innerHTML=str;	
				}
				for(var j=0;j<3;j++){
					artists_chart.children[j].className="colorful";
				}
			}
		})
	  	//新品首发 请求数据
	  	$.ajax({
  			url:"../scripts/json-data/newshop.json",
  			success:function(data){
  				var str="";
				var newGoods_info=document.querySelector(".newGoods_info");
				for(var i=0;i<data.length;i++){
					str+=`<li>
						<a href="" class="clear btns" id="${data[i].id}">
							<img src="${data[i].image1}" alt="" />
							<div class="newGoods_info_r">
								<p class="goodsName">${data[i].goodsName}</p>
								<p class="goodsPrice">¥50</p>
								<div class="like">
									<b class="j_like"></b>
									<i class="like_num" data-num="0">0</i>
								</div>
							</div>
						</a>
					</li>`
					newGoods_info.innerHTML=str;
					$(".newGoods_info").children().hover(function(){
	  						$(this).css("box-shadow","3px 3px 10px #ccc")
	  					},function(){
	  						$(this).css("box-shadow","none")
	  				})
				}
  			}
  		})
	  	//直击现场 请求数据
	  	$.ajax({
  			url:"../scripts/json-data/pubLike.json",
  			success:function(data){
  				var str="";
				var likebox=document.querySelectorAll(".chang_cont ul")[0];
				for(var i=0;i<data.length;i++){
					str+=`<li class="li0">
								<a href="" id="${data[i].id}">
									<img src="${data[i].imgUrl}" alt="" />
									<p class="goodsList_name">${data[i].goodsName}</p>
									<div class="goodsList_info clear">
										<p class="goodsList_price">¥${data[i].realPrice}</p>
										<p class="like">
											<span class="J_like" data-id="1682"></span>
											<i class="like_num" data-num="1209">1209</i>	
										</p>
									</div>
								</a>
							</li>`;
					likebox.innerHTML=str;	
					//大家喜欢,划过效果
				  	$(".gray_bigbox .goodlist").children().hover(function(){
				  		$(this).css({"box-shadow":"3px 3px 10px #ccc","opacity":".6"})
				  	},function(){
				  		$(this).css({"box-shadow":"none","opacity":"1"})
				  	})
				}
  			}
  		})
	  	//换一换内容
		$.ajax({
  			url:"../scripts/json-data/public.json",
  			success:function(data){
  				var str="";
				var likebox2=document.querySelectorAll(".chang_cont ul")[1];
				for(var i=0;i<data.length;i++){
					str+=`<li class="li0">
								<a href="" id="${data[i].id}">
									<img src="${data[i].image1}" alt="" />
									<p class="goodsList_name">${data[i].title1}</p>
									<div class="goodsList_info clear">
										<p class="goodsList_price">¥${data[i].realPrice}</p>
										<p class="like">
											<span class="J_like" data-id="1682"></span>
											<i class="like_num" data-num="1209">${data[i].favoNum}</i>	
										</p>
									</div>
								</a>
							</li>`;
					likebox2.innerHTML=str;	
					//大家喜欢,划过效果
				  	$(".gray_bigbox .goodlist").children().hover(function(){
				  		$(this).css({"box-shadow":"3px 3px 10px #ccc","opacity":".6"})
				  	},function(){
				  		$(this).css({"box-shadow":"none","opacity":"1"})
				  	})
				}
  			}
  		})
		$(".change").click(function(){
			$(".chang_cont .newGoods_info").toggle();
		})
		//推荐专辑
		$.ajax({
  			url:"../scripts/json-data/newshop.json",
  			success:function(data){
  				var str="";
				var goodslist_album=document.querySelector(".goodslist_album");
				for(var i=0;i<data.length;i++){
					str+=`<li>
							<a href="" id="${data[i].id}">
								<img src="${data[i].image1}" alt="" />
								<p class="goodsName over">${data[i].title1}</p>
								<p class="like">
									<span class="J_like" data-id="4451"></span>
									<i class="like_num" data-num="22">4</i>
								</p>
							</a>
						</li>`;
					goodslist_album.innerHTML=str;
					//推荐专辑，出现效果
				  	$(".goodslist_album").children().not(".first_album").hover(function(){
				  		$(this).css({"box-shadow":"3px 3px 10px #ccc"})
				  	},function(){
				  		$(this).css({"box-shadow":"none"})
				  	})
				}
  			}
  		})
		//销量榜
		
		$.ajax({
  			url:"../scripts/json-data/bangshou.json",
  			success:function(data){
  				var str="";
				var albumList=document.querySelector(".albumList");
				var goodsList_rank=document.querySelector(".goodsList_rank");
				for(var i=0;i<data.length;i++){
					str+=`<li class="clear">
							<span class="rankNum">${i+1}</span>
							<a href="" id="${data[i].id}">
								<img src="${data[i].image1}"/>
								<p class="goodsName over">${data[i].title1}</p>
							</a>
						</li>`;
					albumList.innerHTML=str;
					$(".albumList li:first").addClass("firstActive SalesActive");
				  	//划过列表，出现  	
				  	$(".albumList li").hover(function(){
						$(this).addClass("firstActive").siblings().removeClass("firstActive");
				  	},function(){
				  		$(this).removeClass("firstActive")
				  		$(".albumList li:first").addClass("firstActive");
				  	})
				  	
				}
  			}
  		})
		$.ajax({
  			url:"../scripts/json-data/public.json",
  			success:function(data){
  				var str="";
				var goodsList_rank=document.querySelector(".goodsList_rank");
				for(var i=0;i<data.length;i++){
					str+=`<li class="clear">
							<span class="rankNum">${i+1}</span>
							<a href="" id="${data[i].id}">
								<img src="${data[i].image1}"/>
								<p class="goodsName over">${data[i].title1}</p>
							</a>
						</li>`;
					goodsList_rank.innerHTML=str;
					$(".goodsList_rank li:first").addClass("firstActive SalesActive");
				  	//划过列表，出现  	
				  	$(".goodsList_rank li").hover(function(){
						$(this).addClass("firstActive").siblings().removeClass("firstActive");
				  	},function(){
				  		$(this).removeClass("firstActive")
				  		$(".goodsList_rank li:first").addClass("firstActive");
				  	})
				}
  			}
  		})
		//专辑榜点击效果出现的效果
		$(".albumSale .spanclick1").click(function(){
			$(this).addClass("SalesActive").siblings().removeClass("SalesActive");
			$(".albumbox_r .albumList:first").show();
			$(".goodsList_rank").hide();
		})
	  	$(".albumSale .spanclick2").click(function(){
			$(this).addClass("SalesActive").siblings().removeClass("SalesActive");
			$(".goodsList_rank").show();
			$(".albumbox_r .albumList:first").hide();
		})

		//专辑榜
			$.ajax({
  			url:"../scripts/json-data/public.json",
  			success:function(data){
  				console.log(data)
  				var str="";
				var goodslist=document.querySelector(".nearbox .goodsList");
				for(var i=0;i<data.length;i++){
					str+=`<li>
							<a href="" id="${data[i].id}">
								<img src="${data[i].image1}" alt="" />
								<p class="artistName">${data[i].artistName}</p>
								<p class="goodsList_name over">${data[i].goodsName}</p>
								<div class="goodsList_info clear">
									<p class="goodsList_price">¥${data[i].realPrice}</p>
									<p class="like">
										<span class="J_like" data-id="601"></span>
										<i class="like_num" data-num="21">21</i>
									</p>
								</div>
							</a>
						</li>`;
					goodslist.innerHTML=str;
				}
  			}
  		})
		//活动专区
		$.ajax({
  			url:"../scripts/json-data/active.json",
  			success:function(data){
  				var str="";
				var goodslist2=document.querySelector(".artistBox .goodsList");
				for(var i=0;i<data.length;i++){
					str+=`<li>
							<a href="detaList.html">
								<p class="artistName">${data[i].artistName}</p>
								<p class="goodsList_name">${data[i].title1}</p>
								<div class="goodsList_info clear">
									<p class="goodsList_price">¥${data[i].realPrice}</p>
									<p class="like">
										<span class="J_like" data-id="2802"></span>
										<i class="like_num" data-num="184">184</i>
									</p>
								</div>
								<img src="${data[i].image1}" alt="" />								
							</a>
						</li>`;
					goodslist2.innerHTML=str;
				}
  			}
  		})
		//热卖商品
		$.ajax({
  			url:"../scripts/json-data/hua.json",
  			success:function(data){
  				var str="";
				var goodslist3=document.querySelector(".hotbox .goodsList");
				for(var i=0;i<data.length;i++){
					str+=`<li>
							<a href="#">
								<img src="${data[i].image1}" alt="" />
								<p class="goodsList_name">${data[i].goodsName}</p>
								<div class="goodsList_info clear">
									<p class="goodsList_price">¥${data[i].realPrice}</p>
									<p class="like">
										<span class="J_like" data-id="601"></span>
										<i class="like_num" data-num="21">21</i>
									</p>
								</div>
							</a>
						</li>`;
					goodslist3.innerHTML=str;
				}
  			}
  		})
		//华语商城
		
		$.ajax({
  			url:"../scripts/json-data/chiness.json",
  			success:function(data){
  				var str="";
				var goodslist4=document.querySelector(".chineseBox .goodsList");
				for(var i=0;i<data.length;i++){
					str+=`<li>
							<a href="#" class="btns">
								<img src="${data[i].image1}" alt="" />
								<p class="goodsList_name">${data[i].title1}</p>
								<div class="goodsList_info clear">
									<p class="goodsList_price">¥${data[i].realPrice}</p>
									<p class="like">
										<span class="J_like" data-id="601"></span>
										<i class="like_num" data-num="21">21</i>
									</p>
								</div>
							</a>
						</li>`;
					goodslist4.innerHTML=str;
				}
  			}
  		})

	  	//追星必备滚动条
	  	$(".slic_pre").click(function(){
			$(".tabbox").animate({"left":"-871px"},1000)
			$(".starCircle li:first").addClass("slick_active")
			$(".starCircle li:last-child").removeClass("slick_active");
			$(".slic_pre").css("background-position","0 0")
			$(".slick_next").css("background-position","-12px -16px")
	  	})
	  	$(".slick_next").click(function(){
			$(".tabbox").animate({"left":"0px"},1000)
			$(".starCircle li:first").removeClass("slick_active")
			$(".starCircle li:last-child").addClass("slick_active");
			$(".slick_next").css("background-position","-12px 0")
			$(".slic_pre").css("background-position","0 -16px")
	  	})	
	  	//点击商品榜，出现
		$(".artists_title").children().click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(".goods_chart").toggle();
			$(".artists_chart").toggle();
		})

		})
    })
})
