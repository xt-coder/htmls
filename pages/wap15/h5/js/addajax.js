// JavaScript Document

(function(){
	var oMore=document.getElementById('more');	
	var oMoreqa=document.getElementById('moreqa');
	var oResult_list=document.getElementById('result_list');
	if(oMore){//list_page
		oMore.onclick=function(){
			var oAjax=ajax();
			oAjax.post('ajax.php',{param:{id:1},fnSuccess:fnList});	
		}
		function fnList(str){
			var fragment=document.createDocumentFragment();
			var obj=eval('('+str+')');
			for(var i=0,len=obj.length;i<len;i++){
				var oLi=document.createElement('li');
				var oA=document.createElement('a');
				oA.href=obj[i].url;
				oA.innerHTML=obj[i].title;
				oLi.appendChild(oA);
				fragment.appendChild(oLi);	
			}	
			oMore.parentNode.insertBefore(fragment,oMore);
		}
	}
	if(oMoreqa){//search_page
        
		oMoreqa.onclick=function(){
			var oAjax=ajax();
			var oResult=document.getElementById('result_list_major');
			var oResult_user=document.getElementById('result_list');
			var oKey=document.getElementById('key').innerHTML;
			var result=null;
			if(oResult){
				result+=oResult.getElementsByTagName('li').length;	
			}
			if(oResult_user){
				result+=oResult_user.getElementsByTagName('li').length;	
			}
			
			oAjax.post('ajax/get_next_asks',{param:{offset:result,key:oKey},fnSuccess:qaList});	
		}
		function qaList(str){
			
			var obj=eval('('+str+')');
            //console.log(obj )
            if(obj.asks.length==0 && obj.asks_user==0){
                var oMoreqa=document.getElementById('moreqa');
                oMoreqa.getElementsByTagName('a')[0].innerHTML='暂无更多问答';
                oMoreqa.onclick=null;
                return;
            }
			if(obj.asks&&obj.asks.length){//专业回答
				console.log(obj.asks)
				var oResult=document.getElementById('result_list_major');
				if(oResult){//专业回答存在
					var fragment=document.createDocumentFragment();
					for(var i=0,len=obj.asks.length;i<len;i++){
						var oLi=document.createElement('li');
						var oDiv=document.createElement('div');
						oDiv.className="s_quest";
						var oA=document.createElement('a');
						oA.href=obj.asks[i].url;
						var title=obj.asks[i].title;
						oA.innerHTML=title;
						oDiv.appendChild(oA);
						oLi.appendChild(oDiv);
                        if(obj.asks[i].abstract&&obj.asks[i].abstract.length>0){
                            var oDiv2=document.createElement('div');
                            oDiv2.className='s_quest_sponse';
                            oDiv2.innerHTML='<p class="sponse_info mb10"><span>答：</span>'+obj.asks[i].abstract+'</p>';
                        }
                        oLi.appendChild(oDiv2);
						var oDiv3=document.createElement('div');
                        oDiv3.className='s_quest_sponse';
                        if(obj.asks[i].ding&&obj.asks[i].ding>0){
                            var div3_con='<p class="sponse_time"><span class="stime">'+obj.asks[i].answer_time+'</span><strong>|</strong><span class="reder FA s_ioc2">'+obj.asks[i].ding+'</span></p>';
                        }else{
							var div3_con='<p class="sponse_time"><span class="stime">'+obj.asks[i].answer_time+'</span></p>';
						}
						oDiv3.innerHTML=div3_con;
						oLi.appendChild(oDiv3);
						fragment.appendChild(oLi);
					}	
					oResult.appendChild(fragment);
				}else{//专业回答不存在
					var oAllqa=document.getElementById('allqa');
					if(typeof oAllqa == 'undefined'){return;}
					var fragment=document.createDocumentFragment();
					
					var oSection=document.createElement('section');
					oSection.className="mb40 search_type";
					var oH2=document.createElement('h2');
					oH2.innerHTML='<p class="fl s_ioc1">专业回答&nbsp;&nbsp;</p>';
					var oUl=document.createElement('ul');
					oUl.id="result_list_major";
					
					for(var i=0,len=obj.asks.length;i<len;i++){
						var oLi=document.createElement('li');
						var oDiv=document.createElement('div');
						oDiv.className="s_quest";
						var oA=document.createElement('a');
						oA.href=obj.asks[i].url;
						var title=obj.asks[i].title;
						oA.innerHTML=title;
						oDiv.appendChild(oA);
						oLi.appendChild(oDiv);
						if(obj.asks[i].abstract&&obj.asks[i].abstract.length>0){
                            var oDiv2=document.createElement('div');
                            oDiv2.className='s_quest_sponse';
                            oDiv2.innerHTML='<p class="sponse_info mb10"><span>答：</span>'+obj.asks[i].abstract+'</p>';
                        }
                        oLi.appendChild(oDiv2);
						var oDiv3=document.createElement('div');
                        oDiv3.className='s_quest_sponse';
                        if(obj.asks[i].ding&&obj.asks[i].ding>0){
                            var div3_con='<p class="sponse_time"><span class="stime">'+obj.asks[i].answer_time+'</span><strong>|</strong><span class="reder FA s_ioc2">'+obj.asks[i].ding+'</span></p>';
                        }else{
							var div3_con='<p class="sponse_time"><span class="stime">'+obj.asks[i].answer_time+'</span></p>';
						}
						oDiv3.innerHTML=div3_con;
						oLi.appendChild(oDiv3);
						fragment.appendChild(oLi);	
					}	
					oUl.appendChild(fragment);
					oSection.appendChild(oH2)
					oSection.appendChild(oUl);
					var oUserqa=document.getElementById('userqa');
					if(oUserqa){
						oAllqa.insertBefore(oSection,oUserqa);	
					}else{
						oAllqa.appendChild(oSection);	
					}
				}	
				
			}
			if(obj.asks_user&&obj.asks_user.length){
				var oResult_user=document.getElementById('result_list');
				if(oResult_user){//网友回答存在
					var fragment=document.createDocumentFragment();
					for(var i=0,len=obj.asks_user.length;i<len;i++){
						var oLi=document.createElement('li');
						var oDiv=document.createElement('div');
						oDiv.className="s_u_quest";
						var oA=document.createElement('a');
						oA.href=obj.asks_user[i].url;
						var title=obj.asks_user[i].title;
						oA.innerHTML=title;
						oDiv.appendChild(oA);
						oLi.appendChild(oDiv);
						if(obj.asks_user[i].abstract&&obj.asks_user[i].abstract.length>0){
                            var oDiv2=document.createElement('div');
                            oDiv2.className='s_quest_sponse';
                            oDiv2.innerHTML='<p class="sponse_info mb10"><span>答：</span>'+obj.asks_user[i].abstract+'</p>';
                        }
                        oLi.appendChild(oDiv2);
						var oDiv3=document.createElement('div');
                        oDiv3.className='s_quest_sponse';
                        if(obj.asks_user[i].ding&&obj.asks_user[i].ding>0){
                            var div3_con='<p class="sponse_time"><span class="stime">'+obj.asks_user[i].answer_time+'</span><strong>|</strong><span class="reder FA s_ioc2">'+obj.asks_user[i].ding+'</span></p>';
                        }else{
							var div3_con='<p class="sponse_time"><span class="stime">'+obj.asks_user[i].answer_time+'</span></p>';
						}
						oDiv3.innerHTML=div3_con;
						oLi.appendChild(oDiv3);
						fragment.appendChild(oLi);	
					}	
					oResult_user.appendChild(fragment);
				}else{//网友回答不存在
					var oAllqa=document.getElementById('allqa');
					var oMoreqa=document.getElementById('moreqa');
					if(typeof oAllqa == 'undefined'){return;}
					var fragment=document.createDocumentFragment();
					
					var oSection=document.createElement('section');
					oSection.className="mb40 search_type";
					oSection.id="userqa";
					var oH2=document.createElement('h2');
					oH2.innerHTML='<p class="fl s_ioc1">网友回答&nbsp;&nbsp;</p>';
					var oUl=document.createElement('ul');
					oUl.id="result_list";
					
					for(var i=0,len=obj.asks_user.length;i<len;i++){
						var oLi=document.createElement('li');
						var oDiv=document.createElement('div');
						oDiv.className="s_u_quest";
						var oA=document.createElement('a');
						oA.href=obj.asks_user[i].url;
						var title=obj.asks_user[i].title;
						oA.innerHTML=title;
						oDiv.appendChild(oA);
						oLi.appendChild(oDiv);
						if(obj.asks_user[i].abstract&&obj.asks_user[i].abstract.length>0){
                            var oDiv2=document.createElement('div');
                            oDiv2.className='s_quest_sponse';
                            oDiv2.innerHTML='<p class="sponse_info mb10"><span>答：</span>'+obj.asks_user[i].abstract+'</p>';
                        }
                        oLi.appendChild(oDiv2);
						var oDiv3=document.createElement('div');
                        oDiv3.className='s_quest_sponse';
                        if(obj.asks_user[i].ding&&obj.asks_user[i].ding>0){
                            var div3_con='<p class="sponse_time"><span class="stime">'+obj.asks_user[i].answer_time+'</span><strong>|</strong><span class="reder FA s_ioc2">'+obj.asks_user[i].ding+'</span></p>';
                        }else{
							var div3_con='<p class="sponse_time"><span class="stime">'+obj.asks_user[i].answer_time+'</span></p>';
						}
						oDiv3.innerHTML=div3_con;
						oLi.appendChild(oDiv3);
						fragment.appendChild(oLi);	
					}	
					
					oUl.appendChild(fragment);
					oSection.appendChild(oH2);
					oSection.appendChild(oUl);
					oAllqa.insertBefore(oSection,oMoreqa);
					
				}
				
			}
			
			
			
			
			/*for(var i=0,len=obj.length;i<len;i++){
				var oLi=document.createElement('li');
				var oDiv=document.createElement('div');
				oDiv.className="s_u_quest";
				var oA=document.createElement('a');
				oA.href=obj[i].url;
				var title=obj[i].title;
				var key=obj[i].key;
				title=title.replace(key,'<strong class="red">'+key+'<strong>');
				if(obj[i].num){
					title=title.concat('<span class="reder FA s_ioc2 ml10">'+obj[i].num+'</span>');	
				}
				oA.innerHTML=title;
				oDiv.appendChild(oA);
				oLi.appendChild(oDiv);
				fragment.appendChild(oLi);	
			}	
			oResult_list.appendChild(fragment,oMore);*/
		}
	}
	
	
	var oPlus=document.getElementById('plus');
	var oMinus=document.getElementById('minus');
	if(oPlus){
		oPlus.onmousedown=function(){
			var ask_id=document.getElementById('plus_num').getAttribute('ask_id');
			this.className="plusing";
			var oAjax=ajax();
			oAjax.get('ajax/ask/ding/'+ask_id,{param:{},fnSuccess:plusFn});
				
		}
		function plusFn(str){
			var obj=eval('('+str+')');
			if(obj==1){
				var oSpan=document.createElement('span');
				oSpan.className='plusnum';
				oSpan.innerHTML='+1';
				oSpan.id="plusnum";
				oPlus.parentNode.appendChild(oSpan);
				setTimeout(function(){changeButton('plusnum')},300)
				$(oSpan).animate({bottom:100,opacity:0,fontSize:30},1000,function(){$(oSpan).hide()});
				oPlus.onmousedown=null;
				oMinus.onmousedown=null;
				var ask_id=document.getElementById('plus_num').getAttribute('ask_id');
				var name='ask_id'+ask_id;
				SetCookie(name,ask_id);
			}	
		}
	}
	if(oMinus){
		oMinus.onmousedown=function(){
			var ask_id=document.getElementById('plus_num').getAttribute('ask_id');
			this.className="minusing";
			var oAjax=ajax();
			oAjax.get('ajax/ask/cai/'+ask_id,{param:{},fnSuccess:minusFn});
		}
		function minusFn(str){
			var obj=eval('('+str+')');
			if(obj==1){
				var oSpan=document.createElement('span');
				oSpan.className='minusnum';
				oSpan.innerHTML='+1';
				oSpan.id="minusnum";
				oMinus.parentNode.appendChild(oSpan);
				setTimeout(function(){changeButton('minusnum')},200)
				$(oSpan).animate({bottom:100,opacity:0,fontSize:30},1000,function(){$(oSpan).hide()});
				oMinus.onmousedown=null;
				oPlus.onmousedown=null;
				var ask_id=document.getElementById('plus_num').getAttribute('ask_id');
				var name='ask_id'+ask_id;
				SetCookie(name,ask_id);
			}	
		}
	}
	
	function changeButton(str){
		if(str=='plusnum'){
			var oSpan=document.getElementById('plusnum');
			oPlus.className='plusend'	
			oMinus.className='minusend'	
			var oPlus_num=document.getElementById('plus_num');
			var text=parseInt(oPlus_num.innerHTML);
			if(text){
				oPlus_num.innerHTML=1+text;
			}else{
				oPlus_num.innerHTML=1;
			}
		}else if(str=='minusnum'){
			var oSpan=document.getElementById('minusnum');
			oMinus.className='minusend'	
			oPlus.className='plusend'	
			var oMinus_num=document.getElementById('minus_num');
			var text=parseInt(oMinus_num.innerHTML);
			if(text){
				oMinus_num.innerHTML=1+text;
			}else{
				oMinus_num.innerHTML=1;
			}
		}
	}
	//写入到Cookie  
	//name:cookie名称  value:cookie值   
	function SetCookie(name,value) {
		//var Days = 30;
		//var exp = new Date();
		//exp.setTime(exp.getTime() + 60 * 1000);//过期时间 1分钟
		document.cookie =name+"="+value;
	}  
	
})()