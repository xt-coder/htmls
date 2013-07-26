/*
	add by zhiyong
*/

//jQuery.noConflict();
var isLogged = 0;
jQuery(document).ready(function(){
	//if (top.location != self.location) {top.location=self.location;}
	jQuery(".search-type").click(function() {
		if(jQuery(".search-type").css("margin-top") == "-26px") {
			jQuery(".search-type").animate({"margin-top":"0px"});
			if(jQuery("#findname").val() == '搜索会员'||jQuery("#findname").val() == '') {
				jQuery("#findname").val("搜索展示");
				jQuery("#searchtype").val("1")
			}
		}else {
			jQuery(".search-type").animate({"margin-top":"-26px"});
			if(jQuery("#findname").val() == '搜索展示'||jQuery("#findname").val() == '') {
				jQuery("#findname").val("搜索会员");
				jQuery("#searchtype").val("0")
			}
		}
	})
	jQuery("#findname").focus(function(e) {
		if(jQuery("#findname").val() == '搜索展示'||jQuery("#findname").val() == '搜索会员') {
			jQuery("#findname").val('');
		}
	})
	jQuery("#searchButtonNav").click(function() {
		if(jQuery("#findname").val() == '搜索会员'||jQuery("#findname").val() == ''||jQuery("#findname").val() == '搜索展示') {
			alert("请输入搜索信息");
		}else {	
			jQuery("#searchform").submit();
		}
	});
	
	jQuery("#searchButton").click(function() {
		if(jQuery("#findname2").val() == '') {
			alert("请输入搜索信息");
		}else {	
			jQuery("#findname").val(jQuery("#findname2").val());
			jQuery("#searchform").submit();
		}
	});
	
	jQuery(".searchtyperadio").click(function() {
		jQuery("#searchtype").val(jQuery(this).val())
	});
	
	/******face upload********/

	jQuery("#facesubmit").click(function() {
		if(jQuery("#facefile").val()=='') {
			alert("请先上传图片");
			return false;
		}
		if(jQuery("#coords").val()=='') {
			alert("请选取图片");
			return false;
		}
		
		jQuery("#uploadfaceform").attr("action","member.php?mod=myinfo");
 		jQuery("#uploadfaceform").attr("target","");
 		jQuery("#uploadfaceform").submit();
	})
	
	jQuery('.btn_come').on('click',function(event){
		layer.alert('稍后开放，敬请期待！',1,'温馨提示');
	});
	/**************/

	jQuery("#pub_step1_btn").click(function() {
		jQuery(".pub_step1").hide();
		jQuery(".pub_step1_btn").hide();
		jQuery(".pub_step2_btn").show();	
		jQuery(".pub_step2").show();
		
		var act = jQuery('#act_val').val();
		switch(act){
			case 'zedcard':
				var sel = jQuery('input:radio[name="cardLayout"]:checked').val();
				jQuery('#layoutH10_10_421_595_120_170').hide();
				jQuery('#layoutH_5_421_595_184_260').hide();
				jQuery('#layoutV10_10_595_421_170_120').hide();
				jQuery('#layoutV_5_595_421_260_184').hide();
				
				jQuery('#'+sel).show();
				break;
		}
	});
	
	/*上传图片层*/
	var layer_upload_win = null;
	jQuery(".win_upload").click(function() {
		var $this = jQuery(this);
		var width = jQuery($this).attr('w');
		var height = jQuery($this).attr('h');
		
		var twidth = jQuery($this).attr('tw');
		var theight = jQuery($this).attr('th');
		var index = jQuery($this).attr('index');
		layer_upload_win = $.layer({
				type : 2,
				title : ['上传照片' , true],
				offset : ['100px', ''],
				iframe : {
					src : 'http://www.imodel.cc/upload.php?f=imodel&uploadfrom=zedcard&w='+width+'&h='+height+'&tw='+twidth+'&th='+theight+'&index='+index
				},	
				area : ['690px','500px']
			});
	});
	
	
	/*结束*/
	
	/*个人空间二维码*/
	jQuery(".qrCode").click(function() {
		jQuery.layer({
			type : 1,
		    title : ["发送短信",false],
		    border : ['','','',false],
		    page : {dom : '#qrCode'},
			shade : [0.5 , '#000' , false],
			border : [2 , 0.3 , '#000', true]
		});
		
		//layer.tips(jQuery('#qrCode').html() , this,0,290,1);
	});
	
	jQuery("#pub_step2_btn").click(function() {
		jQuery(".pub_step2").hide();
		jQuery(".pub_step1").show();
		jQuery(".pub_step1_btn").show();	
		jQuery(".pub_step2_btn").hide();	
	});
	
	jQuery(".publishmod").live("click",function() {
		jQuery(".contenttype").show();
		/*
		var mod_num = parseInt(jQuery("#mod_num").val());
		var str = '';
		str += '<div id="content_"'+mod_num+' class="pub_content"><textarea name="desc_'+mod_num+'"></textarea><div class="addbtn"><input type="button" class="btn pub_text" value="插入文本">&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="btn pub_pic" value="插入图片"></div></div>';
		jQuery(".pub_step1").append(str);
		*/
	});
	
	jQuery(".pub_text").live("click",function() {
		var mod_num = parseInt(jQuery("#mod_num").val());
		mod_num = mod_num+1;
		jQuery("#mod_num").val(mod_num);
		var str = '';
		str += '<div id="content_'+mod_num+'" class="pub_content2">';
		str += '	<a href="javascript:void(0);" class="titlea">文本</a>';
		str += '	<textarea name="messagetext_'+mod_num+'" class="messagetext"></textarea>';
		str += '	<div class="addbtn2"><input type="button" class="pubbtn pubbtn2 publishmod2" value="> 插入模块">&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="pubbtn pubbtn2 del_publishmod" value="删除模块">';
		str += '		<div class="contenttype2">';

		if(jQuery("#act").val()=='common'){
			str += '			<p class="weight700">';
			str += '				<a class="pub_text" href="javascript:void(0)">文 本</a></p>';
		}

		str += '<p class="weight700"><a  class="pub_pic" href="javascript:void(0)">图 片</a>';
		str += '			</p>';
		str += '		</div>';
		str += '	</div>';
		str += '</div>';
		jQuery(".pub_step1").append(str);

		//editor
		$.getScript('http://www.imodel.cc/plugins/kindeditor-4.1.6/kindeditor-min.js', function() {
						KindEditor.basePath = '../';
						KindEditor.create('textarea[name="messagetext_'+mod_num+'"]',{
							allowFileManager : false,
							items :[
							        'undo', 'redo', '|', 'preview','paste','|', 'justifyleft', 'justifycenter', 'justifyright'
							]
						});
					});
	});
	
	jQuery(".pub_pic").live("click",function() {
		var mod_num = parseInt(jQuery("#mod_num").val());
		mod_num = mod_num+1;
		jQuery("#mod_num").val(mod_num);
		var str = '';
		str += '<div id="content_'+mod_num+'" class="pub_content2">';
		str += '	<a href="javascript:void(0);" class="titlea">图片</a>';
		str += '	<div class="publish_picdiv" id="publish_picdiv'+mod_num+'">';
		str += '	<div class="publish_upload">';
		str += '	<form id="submit_form_'+mod_num+'" method="post" action="uploadfile.php" target="exec_target" enctype="multipart/form-data">';
		str += '	<input id="tmpfile'+mod_num+'" name="file" type="file"><input value="'+mod_num+'" name="mod_num" type="hidden"><input value="common" name="uploadfrom" type="hidden">&nbsp;&nbsp;&nbsp;&nbsp;<input class="btn_upload" name="file_upload" type="button" value="上传" tmpnum="'+mod_num+'"></div>';
		str += '	</form></div>	';
		str += '	<div class="addbtn2"><input type="button" class="pubbtn pubbtn2 publishmod2" value="> 插入模块">&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="pubbtn pubbtn2 del_publishmod" value="删除模块">';
		str += '		<div class="contenttype2">';

		if(jQuery("#act").val()=='common'){
			str += '			<p class="weight700">';
			str += '				<a class="pub_text" href="javascript:void(0)">文 本</a></p>';
		}

		str += '<p class="weight700"><a  class="pub_pic" href="javascript:void(0)">图 片</a>';
		str += '			</p>';
		str += '		</div>';
		str += '	</div>';
		str += '</div>';
		jQuery(".pub_step1").append(str);

	});
	

	jQuery('.btn_upload').live('click', function() {
			var mod_num = jQuery(this).attr("tmpnum");
		  var formname = "#submit_form_"+mod_num;
		  jQuery(formname).submit();
	});
 
 	jQuery("#workspublish").click(function() {
		
		if(jQuery("#subject").val() == "") {
			alert("标题不能为空！");
			return false;
		}
		if(jQuery("#act").val()!='zedcard'){
			if(jQuery("#newcover").val() == "") {
				alert("封面不能为空");
				return false;
			}
		
		
			if(jQuery("#coords").val()=='') {
					alert("请选取封面图片");
					return false;
				}
		}

		if(jQuery("#act").val()=='common'){
			var tmpuploadfilenum = jQuery('.tmppicnum').size();
	 		if(tmpuploadfilenum< 3) {
	 			alert("图片不能少于3张");
	 			return false;
	 		}
		}
		
		if(jQuery("#act").val()=='zedcard'){
			var sel = $('input:radio[name="cardLayout"]:checked').val();
			switch(sel){
				case 'layoutH10_10_421_595_120_170':
					tid = 1;
					break;
				case 'layoutH_5_421_595_184_260':
					tid = 2;
					break;
				case 'layoutV10_10_595_421_170_120':
					tid = 3;
					break;
				case 'layoutV_5_595_421_260_184':
					tid = 4;
					break;
			}
			jQuery("#template_id").val(tid);
		}
		
		/*if(jQuery("#act").val()=='zedcard'){
			sel = $('input:radio[name="cardLayout"]:checked').val();

			switch(sel){
				case 'layoutH10_10_421_595_120_170':
					count = 10;
					break;
				case 'layoutH_5_421_595_184_260':
					count = 5;
					break;
				case 'layoutV10_10_595_421_170_120':
					count = 10;
					break;
				case 'layoutV_5_595_421_260_184':
					count = 5;
					break;
			}
			var coords = jQuery('.coords');
			var tmpuploadfilenum = 0;
			for(i in coords){
				if(jQuery(coords[i]).val()){
					tmpuploadfilenum++;
				}
			}
	 		if(tmpuploadfilenum< count) {
	 			alert("图片不能少于"+count+"张");
	 			return false;
	 		}
		}

		if(jQuery("#act").val()=='3d'){
			var tmpuploadfilenum = jQuery('.tmppicnum').size();
	 		if(tmpuploadfilenum< 18) {
	 			alert("图片不能少于24张");
	 			return false;
	 		}
		}*/
 		
 		
	 	jQuery(".publish_upload").empty();
	 
 		jQuery("#myfrom").attr("action","member.php?mod=publish");
 		jQuery("#myfrom").attr("target","");
 		jQuery("#myfrom").submit();
 		return false;
 	});
	
	//活动发布
	jQuery("#activitypublish").click(function() {
		if(jQuery("#subject").val() == "") {
			alert("标题不能为空！");
			jQuery("#subject").focus();
			return false;
		}
		
		if(jQuery("#activity_date").val() == "") {
			alert("请输入活动时间！");
			jQuery("#activity_date").focus();
			return false;
		}
		
		if(jQuery("#cover").val() == "") {
				alert("封面不能为空");
				return false;
			}
		
		if(jQuery("#address").val() == "") {
			alert("请输入活动地址！");
			jQuery("#address").focus();
			return false;
		}
		
		if(jQuery("#allow_count").val() == "") {
			alert("请输入最多参与人数！");
			jQuery("#allow_count").focus();
			return false;
		}
	
		
		if(jQuery("#demand").val() == "") {
			alert("请输入模特要求！");
			jQuery("#demand").focus();
			return false;
		}
		
	 
 		jQuery("#myfrom").attr("action","member.php?mod=activity");
 		jQuery("#myfrom").attr("target","");
 		jQuery("#myfrom").submit();
 		return false;
 	});
 	
 	jQuery("#worksedit").click(function() {
 		if(jQuery("#subject").val() == "") {
 			alert("标题不能为空！");
 			return false;
 		}
 		if(jQuery("#act").val()=='common'){
			var tmpuploadfilenum = jQuery('.tmppicnum').size();
	 		if(tmpuploadfilenum< 3) {
	 			alert("图片不能少于3张");
	 			return false;
	 		}
		}
/*
		if(jQuery("#act").val()=='3d'){
			var tmpuploadfilenum = jQuery('.tmppicnum').size();
	 		if(tmpuploadfilenum< 18) {
	 			alert("图片不能少于24张");
	 			return false;
	 		}
		}*/
 		if(jQuery("#newcover").val()!='') {
			if(jQuery("#coords").val()=='') {
				alert("请选取封面图片");
				return false;
			}
		}
 		
	 	jQuery(".publish_upload").empty();
	 
 		jQuery("#myfrom").attr("action","member.php?mod=editshow");
 		jQuery("#myfrom").attr("target","");
 		jQuery("#myfrom").submit();
 		return false;
 	});
     
	jQuery(".publishmod2").live("click",function() {
		jQuery(this).parents(".pub_content2").find(".contenttype2").show();
	});
	
	jQuery(".del_publishmod").live("click",function() {
		jQuery(this).parents(".pub_content2").remove();
	});
	
	jQuery(".del_publishmod2").live("click",function() {
		if(confirm("你确定删除该模块？")) {
			jQuery(this).parents(".pub_content2").remove();
		}
	});
	
	/*发送短信*/
	jQuery("#sendms1").click(function() {
		jQuery("#sendmsg").val("");
		jQuery("#showsendms").show();
	 	jQuery("#sendmsfailure").hide();
	 	jQuery("#sendmssuccess").hide(); 
		jQuery.layer({
				type : 1,
		    title : ["发送短信",true],
		    border : ['','','',false],
		    page : {dom : '#showsendmsdiv'}	   
		});
	});
	jQuery("#submit_sendms").live("click",function() {
		var message = jQuery("#sendmsg").val();
		var touid = jQuery("#touid").val();
		var op = "sendms";
		jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,touid:touid,msg:message},function(data){
			var obj = jQuery.parseJSON(data); 
			 if(obj.flag){	
			 	jQuery("#showsendms").hide();
			 	jQuery("#sendmsfailure").hide();
			 	jQuery("#sendmssuccess").show();  	
			}else {
				jQuery("#showsendms").hide();
				jQuery("#sendmssuccess").hide();  
				jQuery("#sendmsfailure").show();  
			}
		});
	});
	jQuery("#sendms2").hover(function(e){
		var x=10;
		var y=0;
		jQuery("#sendms_tis").css({"top": (e.pageY+y) + "px","left": (e.pageX+x) + "px"}).show(); //设置X  Y坐标， 并且显示
	},function(){
		jQuery("#sendms_tis").hide();
	})

	jQuery("#sendms2").click(function(e){
		document.location.href = "http://www.imodel.cc/member.php?mod=login";
	})
	
	jQuery("#ifollow2").hover(function(e){
		var x=10;
		var y=0;
		jQuery("#ifollow_tis").css({"top": (e.pageY+y) + "px","left": (e.pageX+x) + "px"}).show(); //设置X  Y坐标， 并且显示
	},function(){
		jQuery("#ifollow_tis").hide();
	})

	jQuery("#ifollow2").click(function(e){
		document.location.href = "http://www.imodel.cc/member.php?mod=login";
	})
	
	/*发送短信*/
	jQuery("#itouch").click(function() {
		jQuery("#touchmsg").val("");
		jQuery("#showtouch").show();
	 	jQuery("#touchfailure").hide();
	 	jQuery("#touchsuccess").hide(); 
		jQuery.layer({
				type : 1,
		    title : ["@TA",true],
		    border : ['','','',false],
		    page : {dom : '#showtouchdiv'}	   
		});
	});
	jQuery("#submit_touch").live("click",function() {
		var message = jQuery("#touchmsg").val();
		var touid = jQuery("#touid").val();
		var op = "touch";
		jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,touid:touid,msg:message},function(data){
			var obj = jQuery.parseJSON(data); 
			 if(obj.flag){	
			 	jQuery("#showtouch").hide();
			 	jQuery("#touchfailure").hide();
			 	jQuery("#touchsuccess").show();  	
			}else {
				jQuery("#showtouch").hide();
				jQuery("#touchsuccess").hide();  
				jQuery("#touchfailure").show();  
			}
		});
	});
	
	jQuery("#itouch2").hover(function(e){
		var x=10;
		var y=0;
		jQuery("#itouch_tis").css({"top": (e.pageY+y) + "px","left": (e.pageX+x) + "px"}).show(); //设置X  Y坐标， 并且显示
	},function(){
		jQuery("#itouch_tis").hide();
	})

	jQuery("#itouch2").click(function(e){
		document.location.href = "http://www.imodel.cc/member.php?mod=login";
	})
	
	/*删除微博*/
	jQuery(".delweibo2").click(function() {
		alert("该条微博不能删除，如删除该展示，此微博将自动删除！");
	});
	jQuery(".delweibo").click(function() {
		var object = jQuery(this);	
		if(confirm("你确定删除该微博？")) {
			var op = "delweibo";
			var wid=jQuery(this).attr("tmpwid");
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,wid:wid},function(data){
				var obj = jQuery.parseJSON(data);  
				if(obj.flag){
					object.parents(".weibolistdiv").remove();
				}else {
					alert(obj.result)
				}
			});
		}
	});
	
	jQuery(".getcomment").click(function() {
		object = jQuery(this);
		var op = "getcomment";
		var tid=object.attr("tmptid");
		var pic = object.attr("pic");
		
		var obj = document.getElementById('comment_'+tid)
		var container = '#comment-box_'+tid;
	    if(obj.innerHTML=='评论'){
	        obj.innerHTML = '收起';
	        if(jQuery(container).html()){
	            jQuery(container).show();
	        }else{
	            var el = document.createElement('div');//该div不需要设置class="ds-thread"
	            el.setAttribute('data-thread-key', tid);//必选参数
	            el.setAttribute('data-image', pic);//pic
	            el.setAttribute('data-url','http://www.imodel.cc/view/'+tid);
	            DUOSHUO.EmbedThread(el);
	            jQuery(container).append(el);
	        }
	    }else{
	        obj.innerHTML='评论';
	        jQuery(container).hide();
	    }

		
	});
	
	jQuery(".icomment").live("click",function() {	
		object = jQuery(this);
		var message = object.parents(".showipost").find(".commentmsg").val();
		var wid=object.attr("tmpwid");
		var op = "icomment";
		jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,wid:wid,msg:message},function(data){
			var obj = jQuery.parseJSON(data); 
			 if(obj.flag){	
			 	object.parents(".weibolistdiv").find(".commentnum").html(obj.num);
			 	object.parents(".weibolistdiv").find(".box_comment").empty().append(obj.result);
			 	
				object.parents(".weibolistdiv").find(".box_comment").show();	

				
			}
		});
	});
	
	jQuery(".icomment2").live("click",function() {	
		object = jQuery(this);
		var message = object.parents(".showipost").find(".commentmsg").val();
		var wid=object.attr("tmpwid");
		var op = "icomment2";
		jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,wid:wid,msg:message},function(data){
			var obj = jQuery.parseJSON(data); 
			 if(obj.flag){	
			 	jQuery("#view_comment").empty().append(obj.result);	
			 	object.parents(".showipost").find(".commentmsg").val('');		
			}
		});
	});
	
	jQuery(".delcomment").live("click",function() {	
		if(confirm("你确定删除记录？")){
			object = jQuery(this);
			var pid=object.attr("tmppid");
			var op = "delcomment";
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,pid:pid},function(data){
				var obj = jQuery.parseJSON(data); 
				 if(obj.flag){	
				 	var num = parseInt(object.parents(".weibolistdiv").find(".commentnum").html())-1;	
				 	object.parents(".weibolistdiv").find(".commentnum").html(num)	;	
				 	object.parents(".commentlist").remove();
				}
			});
		}
	});
	
	jQuery(".delcomment2").live("click",function() {	
		if(confirm("你确定删除记录？")){
			object = jQuery(this);
			var pid=object.attr("tmppid");
			var op = "delcomment";
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,pid:pid},function(data){
				alert(data)
				var obj = jQuery.parseJSON(data); 
				 if(obj.flag){	
				 	object.parents(".commentlist").remove();
				}
			});
		}
	});
	
	//未登陆时评论提示
	jQuery(".ipost2").hover(function(e){
		var x=10;
		var y=0;
		jQuery("#comment_tis").css({"top": (e.pageY+y) + "px","left": (e.pageX+x) + "px"}).show(); //设置X  Y坐标， 并且显示
	},function(){
		jQuery("#comment_tis").hide();
	})
	
	/* 收藏 */
	//未登陆时提示
	jQuery(".ifavorite2").hover(function(e){
		var x=10;
		var y=0;
		jQuery("#favorite_tis").css({"top": (e.pageY+y) + "px","left": (e.pageX+x) + "px"}).show(); //设置X  Y坐标， 并且显示
	},function(){
		jQuery("#favorite_tis").hide();
	})
	
	jQuery(".ifavorite").live("click",function() {	
		if(confirm('你确定收藏该页面？')) {
	    var tid = jQuery(this).attr("tmptid");    
			var object = jQuery(this);
			var op = "ifavorite";
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,tid:tid},function(data){
				var obj = jQuery.parseJSON(data); 
				if(obj.flag){	 		
					alert("收藏成功！");
					var tmpnum = parseInt(object.children("span").html());
					object.children("span").html(tmpnum+1);
				}else {
					alert("该展示你已收藏！");
				}
			});
		}
	});
	
	jQuery(".delfavorite").live("click",function() {
		if(confirm('你确定删除该收藏？')) {
			var favoriteid = jQuery(this).attr("tmpfavoriteid");
			var object = jQuery(this);
			var op = "delfavorite";
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,favoriteid:favoriteid},function(data){
				var obj = jQuery.parseJSON(data); 
				if(obj.flag){	 		
					alert("删除成功");
				}
			});
		}
	});
	/**********************/
	
	
	
	
	jQuery(".delpic2").live("click",function() {
		var tmpurl = jQuery(this).attr("tmpurl");
		var object = jQuery(this);	
	 	var tmpstr = jQuery("#tmpuploadfile").val();
		tmpstr = tmpstr.replace(tmpurl+"|","");
		tmpstr = tmpstr.replace("|"+tmpurl,"");
		tmpstr = tmpstr.replace(tmpurl,"");
		jQuery("#tmpuploadfile").val(tmpstr);	
		object.parents("li").remove();
	})
	
	jQuery(".delpic").live("click",function() {
		var tmpurl = jQuery(this).attr("tmpurl");
		var object = jQuery(this);
		var op = "delpic";
		jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,pic:tmpurl},function(data){
			var obj = jQuery.parseJSON(data); 
			 if(obj.flag){	
			 	var tmpstr = jQuery("#uploadfile").val();
				tmpstr = tmpstr.replace(tmpurl+"|","");
				tmpstr = tmpstr.replace("|"+tmpurl,"");
				tmpstr = tmpstr.replace(tmpurl,"");
				jQuery("#uploadfile").val(tmpstr);	
				object.parents("li").remove();
			}
		});
	})
	
	jQuery(".delshow").click(function() {
		if(confirm("你确定删除该展示信息？")){
	    var tid = jQuery(this).attr("tmpid");
			var object = jQuery(this);
			var op = "delshow";	   
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,tid:tid},function(data){
				var obj = jQuery.parseJSON(data); 
				 if(obj.flag){	 		
					object.parents("li").remove();
				}
			});
		};
	})
	
	jQuery(".delifollow").click(function() {
		if(confirm("你确定取消关注该好友？")){
		 	var followid = jQuery(this).attr("tmpid");
			var object = jQuery(this);
			var op = "delifollow";
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,followid:followid},function(data){
				var obj = jQuery.parseJSON(data); 
				 if(obj.flag){	 		
					object.parents(".followinfo").remove();
				}
			});
		};
	})
	
	jQuery("#ifollow").live("click",function() {
		if(confirm("你确定关注该好友？")){
		 	var followtouid = jQuery(this).attr("tmpuid");
			var object = jQuery(this);
			var op = "ifollow";
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,followtouid:followtouid},function(data){
				var obj = jQuery.parseJSON(data); 
				if(obj.flag){	 		
					var html = '已关注&nbsp;&nbsp;<a hidefocus="ture" href="javascript:void(0);" class="g1mC u" id="cifollow" tmpid="'+obj.followid+'">取消</a>';
					object.parents("#showfollow").empty().html(html);
				}
			});
		}
	});
	
	
	jQuery("#cifollow").live("click",function() {
		if(confirm('你确定删除对TA的关注吗？')) {
		 	var followid = jQuery(this).attr("tmpid");
			var object = jQuery(this);
			var op = "delifollow";
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,followid:followid},function(data){
				var obj = jQuery.parseJSON(data); 
				 if(obj.flag){	 		
				 	var html = '<a hidefocus="ture" href="javascript:void(0);" class="mC hU plus" id="ifollow" tmpuid="'+obj.uid+'">+&nbsp;加关注</a>';
					object.parents("#showfollow").empty().html(html);
				}
			});
		};
	})
	
	jQuery(".deloutbox").click(function() {
		if(confirm('你确定删除该短信吗？')) {
			var pmid = jQuery(this).attr("tmpid");
			var object = jQuery(this);
			var op = "deloutbox";
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,pmid:pmid},function(data){
				var obj = jQuery.parseJSON(data); 
				 if(obj.flag){	 		
					object.parents("tr").remove();
				}
			});
		}
	})
	
	jQuery("#appointment").click(function() {
			var tmpuid = jQuery(this).attr("tmpuid");
			var op = "checkappointment";
			jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op},function(data){
				var obj = jQuery.parseJSON(data); 
				 	if(obj.flag){	 		
						window.location.href="http://www.imodel.cc/index.php?mod=appointment&uid="+tmpuid;
					}else {
						alert(obj.result);
						return false;
					}
			});
	})
	
	jQuery("#appointmentsubmit").click(function() {
		if(jQuery("#work").val()=='') {
			alert("工作内容必填");return false;
		}
		if(jQuery("#workday").val()=='') {
			alert("工作周期必填");return false;
		}
		if(jQuery("#contact").val()=='') {
			alert("联系人必填");return false;
		}
		if(jQuery("#phone").val()=='') {
			alert("联系电话必填");return false;
		}
		jQuery("#appointmentform").submit();
		return false;
	});
	
	jQuery(".small-post .cover").hover(function(){jQuery(this).find(".overlay").slideDown("fast");},function(){jQuery(this).find(".overlay").slideUp("fast");})
	jQuery(".big-post .cover").hover(function(){jQuery(this).find(".overlay").slideDown("fast");},function(){jQuery(this).find(".overlay").slideUp("fast");})
	
	jQuery(".weibolistdiv:last-child").css("border-bottom","0px");
	jQuery(".commentlist:last-child").css("border-bottom","0px");
	jQuery(".followlist:last-child").css("border-bottom","0px");
	jQuery(".folder:last-child").css("border-bottom","0px");
	jQuery(".show_main:last-child").css("border-bottom","0px");
	
	jQuery(".tabs-active").hover(function(){
		jQuery(".tabs-big").hide();
		jQuery("#tabs-"+jQuery(this).attr("tmpid")).show();
		
		//alert("#tabs-div"+jQuery(this).attr("tmpid"));
		jQuery(".creditboxtop").css("background-color","#fff");
		jQuery("#tabs-div"+jQuery(this).attr("tmpid")).css("background-color","#e5e5e5");
	});
	
	jQuery("#fwlistdiv").hover(function(){
		jQuery("#fwlist").show();
	},function(){jQuery("#fwlist").hide();
	});
	
		
	jQuery("#fwlist li").click(function(){
		jQuery("#fwlistbox").html(jQuery(this).html());
		jQuery("#fwlist").hide();
		
		var op = "indexgetmodel";
		var myaction = jQuery(this).attr("tmpop");
		jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:op,myaction:myaction},function(data){
			var obj = jQuery.parseJSON(data); 
			 if(obj.flag){	
			 	jQuery(".showcase_main").html(obj.result);
			}
		});
		
	});
	
	
	
	//上下页，回到顶部
	var canHideGoTop = false;
    $(document).scroll(function() {
        var currentTop = $(window).scrollTop();
        var clientHeight = $(document).height();

        var goTopDom = document.getElementById('J-goToTop');
        var preViewPics = document.getElementById('J-preView');
        var nextViewPics = document.getElementById('J-nextView');
        if (currentTop < 1000) {
            if (!PREVID && NEXTID) {
                return canHideGoTop && (goTopDom.style.right = -45 + 'px') && (nextViewPics.style.right = 20 + 'px') && (nextViewPics.style.zIndex = 10) && (canHideGoTop = false);
            } else if (PREVID && !NEXTID) {
                return canHideGoTop && (goTopDom.style.right = -45 + 'px') && (preViewPics.style.right = 20 + 'px') && (preViewPics.style.zIndex = 10) && (preViewPics.style.transitionDuration = 0.4 + 's') && (canHideGoTop = false);
            } else if (!PREVID && !NEXTID) {
                return canHideGoTop && (goTopDom.style.right = -45 + 'px') && (canHideGoTop = false);
            } else {
                return canHideGoTop && (goTopDom.style.right = -45 + 'px') && (nextViewPics.style.right = 20 + 'px') && (nextViewPics.style.zIndex = 10) && (preViewPics.style.right = 85 + 'px') && (preViewPics.style.zIndex = 10) && (canHideGoTop = false);
            }
        } else {
            if (!PREVID && NEXTID) {
                !canHideGoTop && (goTopDom.style.right = 20 + 'px') && (nextViewPics.style.zIndex = 8) && (nextViewPics.style.right = 85 + 'px') && (canHideGoTop = true);
            } else if (PREVID && !NEXTID) {
                !canHideGoTop && (goTopDom.style.right = 20 + 'px') && (preViewPics.style.zIndex = 8) && (preViewPics.style.right = 85 + 'px') && (preViewPics.style.transitionDuration = 0.4 + 's') && (canHideGoTop = true);
            } else if (!PREVID && !NEXTID) {
                !canHideGoTop && (goTopDom.style.right = 20 + 'px') && (canHideGoTop = true);;
            } else {
                !canHideGoTop && (goTopDom.style.right = 20 + 'px') && (nextViewPics.style.zIndex = 8) && (nextViewPics.style.right = 85 + 'px') && (preViewPics.style.zIndex = 6) && (preViewPics.style.right = 150 + 'px') && (canHideGoTop = true);
            }
        }
        if (0) {
            _target = $(_target) || document.body;
            clearTimeout(scrollTimer);
            scrollTimer = null;
            scrollTimer = setTimeout(function() {
                goTopDom.style.top = currentTop + clientHeight - 150 + 'px';
                preViewPics.style.top = currentTop + clientHeight - 150 + 'px';
                nextViewPics.style.top = currentTop + clientHeight - 150 + 'px';
                clearTimeout(scrollTimer);
                scrollTimer = null;
            }._$bind(this), 10);
        }
    });
	

    $('#J-goToTop').click(function() {
        $('body,html').animate({scrollTop:0},1000);
    });
    /*$('#J-preView').click(function() {
        window.open('http://www.imodel.cc/view/' + PREVID, "_self");
    });
    $('#J-nextView').click(function() {
        window.open('http://www.imodel.cc/view/' + NEXTID, "_self");
    });*/
	
	
	jQuery.post("http://www.imodel.cc/index.php?mod=ajax",{op:'isLogged'},function(data){
		var obj = jQuery.parseJSON(data); 
		isLogged = obj.logged;
	});
}) 

function callback(msg)  {  
	if(msg) {
		var msg2 = msg.split("-");
		
		var str = '';
		str += '<div class="publish_picdiv_l"><div class="img"><img src="data/attachment/tmp/thumb_'+msg2[1]+'"></div></div>';
		str += '	<div class="publish_picdiv_r">';
		str += '	<p>图片描述：</p>';
		str += '	<textarea name="picdesc_'+msg2[0]+'" class="messagedesc"></textarea>';
		str += '<input type="hidden" name="pic_'+msg2[0]+'" value="'+msg2[1]+'" class="tmppicnum">';
		
		str += '	</div>';
		jQuery("#publish_picdiv"+msg2[0]).empty().html(str);
		var uploadfile = jQuery("#uploadfile").val();
		if(uploadfile) {	
			uploadfile += "|"+msg2[1];
		}else {
			uploadfile = msg2[1];
		}
		jQuery("#uploadfile").val(uploadfile);
	}  
} 


function dropMenu(obj){
	$(obj).each(function(){
		var theSpan = $(this);
		var theMenu = theSpan.find(".submenu");
		var tarHeight = theMenu.height();
		theMenu.css({height:0,opacity:0});
		theSpan.hover(
			function(){
				$(this).addClass("selected");
				theMenu.stop().show().animate({height:tarHeight,opacity:1},400);
			},
			function(){
				$(this).removeClass("selected");
				theMenu.stop().animate({height:0,opacity:0},400,function(){
					$(this).css({display:"none"});
				});
			}
		);
	});
}

$(document).ready(function(){
	dropMenu(".drop-menu-effect");
});

/*
* 智能机浏览器版本信息:
*
*/
var browser={
	versions:function(){
	   var u = navigator.userAgent, app = navigator.appVersion;
	   return {//移动终端浏览器版本信息
	        trident: u.indexOf('Trident') > -1, //IE内核
	        presto: u.indexOf('Presto') > -1, //opera内核
	        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	        mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
	        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
	        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
	        iPad: u.indexOf('iPad') > -1, //是否iPad
	        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	    };
	 }(),
	 language:(navigator.browserLanguage || navigator.language).toLowerCase()
}


function DrawImage(ImgD,FitWidth,FitHeight){
     var image=new Image();
	 
     image.src=ImgD.src;document.title = image.width + ',' + image.height;
	 alert(image.width);
     if(image.width>0 && image.height>0){
     	
         if(image.width/image.height>= FitWidth/FitHeight){
             if(image.width>FitWidth){
                 ImgD.width=FitWidth;
                 ImgD.height=(image.height*FitWidth)/image.width;
             }else{
                 ImgD.width=image.width; 
                ImgD.height=image.height;
             }
         } else{
             if(image.height>FitHeight){
                 ImgD.height=FitHeight;
                 ImgD.width=(image.width*FitHeight)/image.height;
             }else{
                 ImgD.width=image.width; 
                ImgD.height=image.height;
             } 
        }
     }
 }


 jQuery(function() {
    //展示专区标签
    $('div.post-area .area-mark a').not('.active,.hover').each(function() {
        var $this = $(this);
        $this.hover(function() {
            $this.stop(true, true).animate({
                'top': '-51',
                'height': 100
            }, 200);
        }, function() {
            $this.stop(true, true).animate({
                'top': '0',
                'height': 49
            }, 200);
        });
    });
});
 
//登录窗口
var layer_login_win = null;
function login_win(){
	if(isLogged==1){
		parent.document.location.href = parent.document.location.href;	
	}
	 layer_login_win = $.layer({
				type : 2,
				title : ['登录' , false],
				offset : ['100px', ''],
				iframe : {
					src : 'http://www.imodel.cc/member.php?mod=login&win=1'
				},	
				area : ['560px','540px']
			});
}

var refreshcard = function(index){
	var coords,sel,bigpic,smallpic,target;
	for(var i=1;i<=10;i++){
		coords = jQuery('#coords_'+i).val();
		if(coords){
			coords = coords.split('|');
			bigpic = coords[0];
			smallpic = coords[1];
			sel = $('input:radio[name="cardLayout"]:checked').val();

			switch(sel){
				case 'layoutH10_10_421_595_120_170':
					target = 'pic_1_'+index;
					break;
				case 'layoutH_5_421_595_184_260':
					target = 'pic_2_'+index;
					break;
				case 'layoutV10_10_595_421_170_120':
					target = 'pic_3_'+index;
					break;
				case 'layoutV_5_595_421_260_184':
					target = 'pic_4_'+index;
					break;
			}
			
			if(jQuery('#'+target)){
				if(i==1){
					jQuery('#'+target).attr('src','data/attachment/tmp/'+bigpic);	
				}else{
					jQuery('#'+target).attr('src','data/attachment/tmp/'+smallpic);	
				}
			}
		}
	}
}

 /*
  * Image preload and auto zoom
  * scaling     是否等比例自动缩放
  * width       图片最大高
  * height      图片最大宽
  * loadpic     加载中的图片路径
  * example $("*").LoadImage(true,w,h);
 */
jQuery.fn.LoadImage=function(scaling,width,height,loadpic,fun){
    if(loadpic==null)loadpic="static/image/loading.gif";
    return this.each(function(){
        var t=$(this);
        var src=$(this).attr("src")
        var img=new Image();
        //alert("Loading...")
        img.src=src;
        //自动缩放图片
        var autoScaling=function(){
            if(scaling){
           
                if(img.width>0 && img.height>0){ 
                    if(img.width/img.height>=width/height){ 
                        if(img.width>width){ 
                            t.width(width); 
                            t.height((img.height*width)/img.width); 
                            t.css("margin-top", (height-t.height())/2);
                        }else{ 
                            t.width(img.width); 
                            t.height(img.height); 
                            t.css("margin-top", (height-t.height())/2);
                        } 
                    } 
                    else{ 
                        if(img.height>height){ 
                            t.height(height); 
                            t.width((img.width*height)/img.height);
                            t.css("margin-top", (height-t.height())/2);
                        }else{ 
                            t.width(img.width); 
                            t.height(img.height); 
                            t.css("margin-top", (height-t.height())/2);
                        } 
                    } 
                } 
                
            }    
        }
        //处理ff下会自动读取缓存图片
        if(img.complete){
            //alert("getToCache!");
            autoScaling();
            return;
        }
        $(this).attr("src","");
        var loading=$("<img alt=\"加载中...\" title=\"图片加载中...\" src=\""+loadpic+"\" />");
        
        t.hide();
        t.after(loading);
        $(img).load(function(){
            autoScaling();
            loading.remove();
            t.attr("src",this.src);
            t.show();

			if(typeof(fun)== 'function'){
			  fun();
			}

        });
        
    });
}