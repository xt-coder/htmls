/*tooltip*/
$(function(){
	$('[rel=tooltip]').hover(function(){ 
		$('<div class="tooltip" style="display:none; top:'+($(this).offset().top+$(this).height()+5)+'px;left:'+$(this).offset().left+'px;">'+$(this).attr('title')+'<div class="arrow"></div></div>').appendTo('body').fadeIn();
		//$('body').append('<div class="tooltip" style="top:'+($(this).offset().top+$(this).height()+5)+'px;left:'+$(this).offset().left+'px;">'+$(this).attr('title')+'<div class="arrow"></div></div>');						  		
	},
	function(){
		$('.tooltip').fadeOut().remove();	
	})
	
	
	$('.topbar .collapse').click(function(){
		$('.topbar .module, .topbar .search, .topbar .sub').toggle();									  
	})
})


/*选项卡效果*/
$(function(){
	$('.taber .head a').hover(function(){
		$('.taber .body').hide();
		$('.taber #'+$(this).attr('lang')).show();	
		
		$('.taber .head a').removeClass('selected');
		$(this).addClass('selected');
	})		   
})


/*头部二级菜单*/
$(function(){
	$('.topbar .module li').hover(function(){
		$(this).addClass('selected');
	},
	function(){
		$(this).removeClass('selected');
	})
})


/*heading响应式用户体验*/
$(function(){
/*	$('.heading').hover(function(){
		$(this).animate({'height':'+=10'},300,function(){
														  
		})							 
	},
	function(){
		$(this).animate({'height':'-=10'},300,function(){
														  
		})		
	})	*/	   
})

$(function(){
	$('a[rel=popup]').click(function(){
		
		$('body').prepend('<div id="mask"></div>').find('#mask').css({opacity:0.5,  cursor:'pointer', background:'black', position:'absolute', zIndex:999, width:'100%',  height:$(document).height()});
		
		//$('body').append('<div class="popup"><del>x</del><div class="head">渴切-开源中文css框架</div><div class="body">渴切是一个开源中文 (X)HTML/CSS 框架 ,它的目的是减少你的css开发时间。它提供一个可靠的css基础去创建你的项目,能够用于网站的快速设计,通过重设和重建浏览器标准，可以让每个网站防 止枯燥的跨浏览器兼容性测试。你可以将他理解成一套模板，里面包含了大多数站点中所需要的那些css类。他很小，只有四个文件而已。总共不到6KB。</div><div class="foot"><a href="#" class="button blue">关闭</a></div></div>').find('.popup').fadeIn();
		$($(this).attr('href')).fadeIn();
		
	})		   
	
	/*点击遮罩关闭,live方法用于，为通过js新增的元素添加事件*/
	$('#mask, .popup del').live('click',function(){
		$('#mask').remove();
		$(this).parent('.popup').fadeOut(); $(this).parent().parent('.popup').fadeOut();
	})
})

/*popover*/
$(function(){
	$('*[rel=popover], .popover').live('mouseover',function(){
		//alert(o) 
		e = $(this)[0];
		
		$('<div class="popover" onMouseOver="'+$('.popover').show()+'" onMouseOut="'+$('.popover').hide()+'"  style="display:none; top:'+($(this).offset().top+$(this).height()+3)+'px;left:'+$(this).offset().left+'px;">'+$(this).attr('title')+'<div class="arrow"></div></img></div>').appendTo('body').show();
							   
	})	
	
	$('*[rel=popover], .popover').live('mouseout',function(){
		$('.popover').hide().remove();						   
	})	
	
	/*$('.popover').live('mouseover',function(){
		$(this).show();										
	})
	$('.popover').live('mouseout',function(){
		$(this).hide();									   
	})*/
})





/*卡通公仔*/
$(function(){
	setTimeout(function(){
			$('.cartoon').fadeIn();				
		},1000)		   
})

/*头部提示语*/
$(function(){
	$('.spring del').click(function(){
		$('.spring').slideUp();								
	})		   
})

/*头部导航搜索栏 用户体验*/
$(function(){
	$('.topbar input[type=text]').focus(function(){
		//$(this).animate({'width':'+=10px'},'fast')									 
	})			
})


/*导航条固定*/
$(document).ready(function(){
		
	$(window).bind('scroll',function() {
		if(Math.abs($(window).scrollTop())>300)
			{
				$('.topbar.js').hide().addClass('fixed').fadeIn('slow');
			}
			else
			{
				$('.topbar.js').removeClass('fixed');
			}
	});
	
});

/*回到顶部*/
$(document).ready(function(){
	
	if($.browser.msie&&($.browser.version == "6.0")&&!$.support.style){
		
	}
	else{
		$(window).bind('scroll',function() {
			if(Math.abs($(window).scrollTop())>600)
				{
					$('.scrolltotop').fadeIn();
				}
				else
				{
					$('.scrolltotop').fadeOut();
				}
		});	
	}
	
});


/*幻灯片*/
$(function(){
		
		$.extend({
			autoSlider:function(){
				
				if($('.slider .item.selected').next().size()==0){
					$('.slider .item.selected').removeClass('selected').parent().find('.item:first').addClass('selected');
				}
				else{
					$('.slider .item.selected').removeClass('selected').next().addClass('selected');
				}
			}
		})
		// 函数重复调用，基于jQuery的方法一定要以上面的写法定义，否则这里不会生效
		setInterval("$.autoSlider()",6000);

     $('.slider .prev').click(function(){
		
			if($('.slider .item.selected').next().size()==0){
					$('.slider .item.selected').removeClass('selected').parent().find('.item:first').addClass('selected');
				}
				else{
					$('.slider .item.selected').removeClass('selected').next().addClass('selected');
				}
		},
		function(){});
		
		$('.slider .next').click(function(){
		
			if($('.slider .item.selected').next().size()==0){
					$('.slider .item.selected').removeClass('selected').parent().find('.item:first').addClass('selected');
				}
				else{
					$('.slider .item.selected').removeClass('selected').next().addClass('selected');
				}
		},
		function(){})
	})


// 加载prettify着色插件

// Load the stylesheet that we're demoing.
/*var script = document.createElement('script');
script.src = 'assets/js/prettify.js';
document.getElementsByTagName('head')[0].appendChild(script);

var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'assets/css/prettify.css';
document.getElementsByTagName('head')[0].appendChild(link);
  

$(function(){
  // 调用prettify着色插件
  $('pre').addClass('prettyprint linenums');
  prettyPrint();
})*/