define([], function(){
	return {
		setCookie:function(k,v,num){
			var d = new Date();
			d.setDate(d.getDate()+num);
			if(num==undefined){
				document.cookie = k + "=" + v;
			}else{
				document.cookie = k + "=" + v + ";expires=" + d;
			}
		},
		getCookie:function(k){
			var str = document.cookie
			var arr = str.split("; ")
			for(var i=0;i<arr.length;i++){
				if(arr[i].split("=")[0] == k){
					return arr[i].split("=")[1]
				}
			}
			return "";
		}
	}
});
