// JavaScript Document
$(function(){
	function getCss(ele,attr){
		try{
			return parseInt(window.getComputedStyle(ele,null)[attr]);
		}catch(e){
			return parseInt(ele.currentStyle[attr]);
		}	
	}
	$('#share').click(function(){
		var oPopContent=document.getElementById('pop_content');
		var ww=document.documentElement.clientWidth||document.body.clientWidth;
		var wh=document.body.clientHeight||document.documentElement.clientHeight;
		var oDivHeight=getCss(oPopContent,'height');
		$('#pop').show().css({height:wh}).animate({opacity:0.6})
		$('#pop_content').css({bottom:-oDivHeight,width:ww}).show().animate({bottom:0})
	});
	$('#close_pop').click(close_pop);
    $('#pop_content li').click(close_pop)
    function close_pop(){
        var oPopContent=document.getElementById('pop_content');
        var oDivHeight=getCss(oPopContent,'height');
        $('#pop_content').animate({bottom:-oDivHeight},function(){$(oPopContent).hide()})
        $('#pop').animate({opacity:0},function(){$('#pop').hide()})
    }
})
