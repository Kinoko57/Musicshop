require(["../scripts/config.js"],function(){
	require(["jquery","common","swiper","cookies","_public"],function($,com,swiper,cookie){	
		$(function(){
			
			var timePar=document.querySelector("#time");
			var pricePar=document.querySelector("#price");
			var salesPar=document.querySelector("#sales");
			var time=document.querySelector("#time span");
			var price=document.querySelector("#price span");
			var sales=document.querySelector("#sales span");
			//排序、价格等背景图片
			var type=document.querySelectorAll(".type li");
			var index=1;
			for(let i=0;i<type.length;i++){
				type[i].onclick=function(){
					for(let j=0;j<type.length;j++){
						type[j].children[0].style.backgroundPosition="0 -54px";
					}
					if(index==1){
						type[i].children[0].style.backgroundPosition="0 -72px";
						index=2;
					}else if(index==2){
							type[i].children[0].style.backgroundPosition="0 -54px";					
							index=1
					}
				}
			}



		class Page{
			constructor(options){
				this.url = options.url;
				this.goods_List = options.goods_List;
				this.left = options.pagebtnL;
				this.right = options.pagebtnR;
				this.pagelist = options.pagelist;
				this.num = options.num;
				this.salesPar=options.salesPar;
				this.timePar=options.timePar;
				this.pricePar=options.pricePar;
				this.index1 = 0;
				this.load()
			}
			load(){
				var that = this;
				$.ajax({
					url:this.url,
					success:function(res){
						that.res = res;
						that.createPage()
						that.display();
					}
				})
			}
			createPage(){
				this.maxNum = Math.ceil(this.res.length / this.num);
				this.pagelist.html("");
				for(var i=0;i<this.maxNum;i++){
					this.pagelist.append($("<li>"+ (i+1) +"</li>"))
				}
				
				this.pagelist.find("li").eq(this.index1).addClass("separator1").siblings().removeClass("separator1")
				
				this.addEvent()
			}
			addEvent(){
				var that = this;
				this.left.on("click",function(){
					that.changeIndex("l")
				})
				this.right.on("click",function(){
					that.changeIndex("r")
				})
				this.goods_List.on("click",".iconfont",function(){
					that.id = $(this).siblings().attr("index");
					that.setCookie()
					$(location).attr("href","shop.html");
				})
				this.goods_List.on("click",".libox",function(){
					that.setCookie1($(this));
					$(location).attr("href","detaList.html")
				})
				this.salesPar.click(function(){
					sales.style.backgroundPosition=" -6px -4px";
					price.style.backgroundPosition="-28px -4px";
					time.style.backgroundPosition=" -28px -4px";
					that.order();
				})
				this.timePar.click(function(){
					sales.style.backgroundPosition=" -73px -4px";
					time.style.backgroundPosition=" -6px -4px";
					price.style.backgroundPosition="-28px -4px";
					console.log("1")
					that.load();
				})
				this.pricePar.click(function(){
					time.style.backgroundPosition=" -28px -4px";
					price.style.backgroundPosition=" -6px -4px";
					sales.style.backgroundPosition=" -73px -4px";
					that.order1();
				})
			}
			changeIndex(type){
				if(type == "l"){
					if(this.index1 == 0){
						this.index1 = this.maxNum-1
					}else{
						this.index1--
					}
				}else{
					if(this.index1 == this.maxNum-1){
						this.index1 = 0
					}else{
						this.index1++
					}
				}
				this.pagelist.find("li").eq(this.index1).addClass("separator1").siblings().removeClass("separator1")
				this.display()
			}
			display(){
				var str = "";		
				for(var i=this.index1*this.num;i<this.index1*this.num+this.num;i++){
					if(i<this.res.length){
						str += `<li index1="${this.res[i].id}">
							<div  class="libox" index="${this.res[i].id}">
								<a href="#">
									<img src="${this.res[i].image1}" alt="" />
									<p class="goods-list-name">${this.res[i].title1}</p>
								</a>
								<div class="goods-list-info clear">
									<p class="goods-list-price">¥${this.res[i].realPrice}</p>
									<p class="like clear">
										<span class="J_like" data-id="4179"></span>
										<i class="like_num" data-num="8">${this.res[i].favoNum}</i>
									</p>
								</div>
							</div>
							 <i class="iconfont icon-gouwuche"></i>  
                </li>`
					}
					this.goods_List.html(str);
				}
			}
			setCookie(){
				this.goods = JSON.parse($.cookie("goods")) || [];
				if(this.goods.length < 1){
					this.goods.push({
						id:this.id,
						count:1
					})
				}else{
					var that = this;
					var onOff = true;
					$.each(this.goods,function(index,value){
						if(value.id == that.id){
							that.goods[index].count++;
							onOff = false				
						}
					})
					if(onOff){
						this.goods.push({
							id:this.id,
							count:1
						})
					}
				}
				$.cookie("goods",JSON.stringify(this.goods))
				console.log(JSON.parse($.cookie("goods")))
			}
			setCookie1($that){
				var id=$that.attr("index");
				$.cookie("goodLists",id);
			}
			order(favoNum){
				for(var i=0;i<this.res.length;i++){
					for(var j=i+1;j<this.res.length;j++){
						if(this.res[i].favoNum>this.res[j].favoNum){
							[this.res[i],this.res[j]]=[this.res[j],this.res[i]]
						}
					}
					this.display();
				}
			}
			order1(){
				for(var i=0;i<this.res.length;i++){
					for(var j=i+1;j<this.res.length;j++){
						if(this.res[i].realPrice>this.res[j].realPrice){
							[this.res[i],this.res[j]]=[this.res[j],this.res[i]]
						}
					}
					this.display();
				}
			}
		}
		new Page({
			url:"../scripts/json-data/goodslist.json",
			goods_List:$(".goods_List"),
			pagebtnL:$(".pagebtnL"),
			pagebtnR:$(".pagebtnR"),
			pagelist:$(".page"),
			salesPar:$("#sales"),
			timePar:$("#time"),
			pricePar:$("#price"),
			num:20
		})
	
		
			
			
			
		})
    })
})