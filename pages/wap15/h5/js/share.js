// JavaScript Document
//cookie an share
var ask_id=document.getElementById('plus_num').getAttribute('ask_id');
var oCookie=document.cookie;
oCookie=oCookie.split(';');
for(var i=0;i<oCookie.length;i++){
   var cookName=oCookie[i].split('=')[1];
	if(cookName == ask_id){
		var oPlus=document.getElementById('plus');
		var oMinus=document.getElementById('minus');
		oPlus.className='plusend';
		oMinus.className='minusend';
		oPlus.id='none';
		oMinus.id='none';
	}
}
function sns_share(type){
	if(type=='zone'){
		var terr='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
	}else if(type=="weibo"){
		var terr='http://service.weibo.com/share/share.php?';
	}else if(type='vt'){
		var terr='../share.v.t.qq.com/index.php@c=share&a=index&';
	}
	var title=document.title;
	var url=document.URL;
	var summary="佰程旅行网,作为中国领先的出境旅游服务提供商,专业的出国旅游网站，我们提供出国旅游,自由行,旅游签证,国际酒店预订等全方位的出境旅游服务。";
	var site='佰程问答';
	var pics='佰程问答';
	//var pop_url=terr+'site='+encodeURIComponent(site)+'&url='+encodeURIComponent(url)+'&title=&'+encodeURIComponent(title)+'&summary='+encodeURIComponent(summary)+'&pics='+encodeURIComponent(pics);
	pop_url=terr+'title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(summary)+'&pics='+encodeURIComponent(pics)+'&site='+encodeURIComponent(site)+'&url='+encodeURIComponent(url);
	return "window.open('" + pop_url + "', '_blank');";
}