// JavaScript Document
//ÏÂÀ­µ¼º½
function dropNav(){
	var $btn=$(".top_lo"),
		$Mn=$(".sab_dh"),
		$true=true;
		$Mn.fadeOut();	
	$btn.bind("click",function (e){
		if($true){
			$Mn.fadeIn()
			$true=false;
		}else{
			$Mn.fadeOut();
			$true=true;
		}
		e.preventDefault();
		return false;
	});
	$Mn.bind("click" ,function (e){
		$Mn.fadeIn()
		$true=false;
		e.stopPropagation();
	});
	$(document).bind("click" ,function (){
		$Mn.fadeOut();
		$true=true;
	});
};

$(function (){
	dropNav();	
});