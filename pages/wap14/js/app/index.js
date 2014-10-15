var p2=0,as2=document.getElementById('pagenavi2').getElementsByTagName('a');
for(var i=0;i<as2.length;i++){
	(function(){
		var j=i;
		as2[j].onclick=function(){
			tt2.slide(j);
			return false;
		}
	})();
}
var tt2=new TouchSlider({
	id:'slider',
	'auto':0,
	fx:'ease-out',
	direction:'left',
	speed:600,
	timeout:5000,
	'before':function(index){
		if(typeof p2 != 'undeinfed') as2[p2].className='';
		as2[index].className='active';
		p2=index;
	}
});
/*var tt3=new TouchSlider({
	id:'slider1',
	'auto':false,
	fx:'ease-out',
	direction:'left',
	fixWidth:false,
	speed:600
});*/
/*$(function(){
	$('.pci_li').each(function(index){
		$(this).click(function(e){
			if($(this).find('p').css('display')=='' || $(this).find('p').css('display')=='none'){
				$(this).find('p').show();
			}else{
				$(this).find('p').hide();
			}
			e.stopPropagation();
		})
	})
})*/
$(function(){
	var $list=$('.nav_u li');
	var $ul=$('.nav_u');
	var $btn=$(".sab");
	var $nav=$(".nav_d")	
	$(window).bind("resize",function (){
		var num=0;
		var nWh=$nav.width();
		var wh=0;
		var index=0;
		for(var i=0;i<$list.length;i++){
			wh=$list.eq(i).outerWidth(true);
			num += parseInt(wh);
		}
		$ul.css('width',num+'px');		
	}).trigger("resize");
})