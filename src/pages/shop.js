require(["../scripts/config.js"],function(){
	require(["jquery","common","swiper","cookies","_public"],function($,com,swiper,cookie){	
		$(function(){
			
			class Car{
				constructor(options){
					this.url = options.url;
					this.tbody = options.tbody;
					this.getCookie()
					this.load();
				}
				getCookie(){
					this.goods = JSON.parse($.cookie("goods"));
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
					var str = "";
					$.each(this.res, (key,item)=>{
						$.each(this.goods, (index,value)=>{
							if(item.id == value.id){
								var sum=item.realPrice*value.count;
								str += `<tr class="J_cart_goods" index=${value.id}>
										<td>
											<a href="" class="pic"><img src="${item.image1}" alt="" /></a>
											<a href="" class="c_6">${item.title1}</a>
											<a href="" class="ico_close J_confirm_remove" title="删除"></a>
										</td>
										<td align="center">
											<button class="reduce">-</button><input type="text" class="num_cont" value="${value.count}"/><button href="#" class="add">+</button>
										</td>
										<td align="center" class="jiage">
											<p class="danjia">${item.realPrice}元</p>
										</td>
										<td align="center" width="120" class="sum">
											<span class="zsum">${sum}</span>元
										</td>
									</tr>`
								
							}
						});
					});
					this.tbody.html(str);
					this.addEvent();
					this.sumAccount();
				}
				addEvent(){
					var that = this;
					this.tbody.on("click",".ico_close",function(){
						$(this).parent().parent().remove()
						that.id = $(this).parent().parent().attr("index");
						that.setCookie(function(i){
							that.goods.splice(i,1)
						})
					})
					this.tbody.on("click",".add",function(){
						that.id = $(this).parent().parent().attr("index");
						var ele= $(this).siblings(".num_cont").val();
						ele++;
						var value=ele;
						$(this).siblings(".num_cont").val(value);
						that.smallAccount($(this),$(this).siblings(".num_cont").val());
						that.sumAccount();
						that.setCookie(function(i){
							that.goods[i].count = value;
						})
					})
					this.tbody.on("click",".reduce",function(){
						that.id = $(this).parent().parent().attr("index");
						var ele = $(this).siblings(".num_cont").val();
						if(ele<=1){
							value=1;
						}else{
							ele--;
						}
						var value=ele;
						$(this).siblings(".num_cont").val(value);
						that.smallAccount($(this),$(this).siblings(".num_cont").val());
						that.sumAccount();
						that.setCookie(function(i){
							that.goods[i].count = value;
						})
					})
					this.tbody.on("input",".num_cont",function(){
						that.id = $(this).parent().parent().attr("index");
						var value=$(this).val();
						console.log(value)
						$(this).val(value)
						that.smallAccount($(this),$(this).val());
						that.sumAccount();
						that.setCookie(function(i){
							that.goods[i].count = value;
							console.log(that.goods[i].count)
						})
					})
				}
				smallAccount($this,$value){
					var cot=$value;
					var  pri=parseInt($this.parent().siblings(".jiage").find(".danjia").html());
					var zpri=pri*parseInt(cot);
					$this.parent().siblings(".sum").find(".zsum").html(zpri);
				}
				sumAccount(){
					var arr=$(".zsum");
					var totalPrice=0;
					for(var i=0;i<arr.length;i++){
						console
						totalPrice+=parseInt(arr[i].innerHTML);
					}
					$(".toalPirce").html(totalPrice);
				}
				setCookie(callback){
					for(var i=0;i<this.goods.length;i++){
						if(this.goods[i].id == this.id){
							callback(i)
							break;
						}
					}
					$.cookie("goods",JSON.stringify(this.goods))
				}
			}

			new Car({
				url:"../scripts/json-data/goodslist.json",
				tbody:$(".tabs tbody")
			})
			
			
			
			$(".next_btn").click(function(){
				$(".masklayer").show();
				$(".payMoney").show();
			})
			$(".payMoney .ico_close").click(function(){
				$(".masklayer").hide();
				$(".payMoney").hide();
			})
		})
	})
})