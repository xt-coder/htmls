function ajax(){
	if(window.XMLHttpRequest){
		var xhr=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		var xhr=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	function fn(method,url,obj){
		if(typeof url == 'string'){
			var param=obj.param;
			var sParam=null;
			if(typeof param == 'object'){
				sParam=paramToStr(param);
				if(method=='get'){
					if(url.indexOf('?')==-1){
						url+='?'+sParam;
					}else{
						url+='&'+sParam;
					}
				}
			}
			
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4){
					if(xhr.status==200 || xhr.status==304){
						var fnSuccess=obj.fnSuccess;
						if(typeof fnSuccess=='function'){
							var str=xhr.responseText;
							fnSuccess(str);
						}
					}else{
						var fnError=obj.fnError;
						if(typeof obj.fnError=='function'){
							fnError();
						}
					}
				}
			}
			if(method=='get'){
				xhr.open('get',url,true);
				xhr.send(null);
			}else if(method=='post'){
				xhr.open('post',url,true);
				xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				xhr.send(sParam);
			}
			
		}
	}
	
	function paramToStr(param){
		var aParam=[];
		for(var key in param){
			aParam.push(key+'='+param[key]);
		}
		var strParam=aParam.join('&');
		return encodeURI(strParam);
	}
	
	function fnGet(url,obj){
		fn('get',url,obj);
	}
	function fnPost(url,obj){
		fn('post',url,obj);
	}
	
	return {get:fnGet,post:fnPost};
}
