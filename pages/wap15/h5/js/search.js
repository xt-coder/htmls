// JavaScript Document
/*
 联想搜索模块
 配合ajax.js文件
 参数如下：
 searchId  =====   输入框ID
 thinkId   =====   联想框ID
 url       =====   ajax请求的地址
 formId    =====   form表单的ID
 closeId   =====   关闭按钮ID（可选）

 返回json格式如下；
 [{name:xxx},{name,xxx}]
 */
getThinksToAjax('search','search_think','ajax/suggest','form','search_close');

function getThinksToAjax(searchId,thinkId,url,formId,closeId){
    var oSearch=document.getElementById(searchId);//输入框ID
    var oThink=document.getElementById(thinkId);//联想框ID
    var oForm=document.getElementById(formId);//form表单ID
    if(typeof closeId !='undefined'){
        var oClose=document.getElementById(closeId);
    }
    oSearch.onfocus=setFocus;//输入框获得焦点

    function setFocus(){//输入框获得焦点
        oSearch.values=null;//设置输入框初始值
        oSearch.onkeyup=getKeyValue;//获得按键值
        document.onclick=closeThink;//输入框失去焦点
        isInputChange();
    }
    function getKeyValue(e){//获得按键值
        e=e||window.event;
        var keyValue= e.keyCode;
        switch (keyValue){
            case 38:
                setKeyValue('prev');//上下箭头设置input内容
                break;
            case 40:
                setKeyValue('next');//上下箭头设置input内容
                break;
            default :
                isInputChange();//判断输入框是否被改变
        }
    }

    function setKeyValue(select){//上下箭头设置input内容
        if(typeof oSearch.num=='undefined'){oSearch.num=-1;}
        var oLis=oThink.getElementsByTagName('li');
        var len=oLis.length;
        if(select=='prev'){
            oSearch.num--;
            if(oSearch.num<0){oSearch.num=len-1;}
            for(var i=0;i<len;i++){
                oLis[i].className='';
            }
            oLis[oSearch.num].className='current';
            oSearch.value=oLis[oSearch.num].innerHTML;
        }else if(select=='next'){
            oSearch.num++;
            if(oSearch.num>=len){oSearch.num=0;}
            for(var i=0;i<len;i++){
                oLis[i].className='';
            }
            oLis[oSearch.num].className='current';
            oSearch.value=oLis[oSearch.num].innerHTML;
        }
    }

    function isInputChange(){//判断输入框是否被改变
        var inputValue=oSearch.value;
        inputValue=inputValue.replace(/(^\s+)|(\s+$)/g,'');
        if(inputValue.length>0){
            if(oSearch.values!=inputValue){
                oSearch.values=inputValue;
                if(typeof closeId !='undefined'){
                    setClose('open');//显示关闭按钮
                }
                callAjax();//请求ajax
            }
        }else{
            setThinks('close');
            if(typeof closeId !='undefined'){
                setClose('close');//隐藏关闭按钮
            }
        }
    }

    function setClose(select){//设置关闭按钮
        if(select=='open'){
            oClose.style.display='block';
            oClose.onclick=function(){
                setThinks('close');
                setClose('close');//隐藏关闭按钮
            }
        }else if(select=='close'){
            oSearch.value='';
            oClose.style.display='none';
        }
    }

    function callAjax(){//请求ajax
        ajax().get(url,{param:{key:oSearch.value},fnSuccess:fnSuccess});
    }

    function fnSuccess(str){//接收json值
        var obj=eval("("+str+")");
        var val='';
        if(obj.length>0){
            for(var i=0,len=obj.length;i<len;i++){
                val+="<li>"+obj[i]['name']+"</li>";
            }
            setThinks('open',val);//显示联想列表
        }else{
            setThinks('close');//关闭联想列表
        }
    }

    function setThinks(select,val){//设置联想列表
        if(select=='open'){
            oThink.style.display='block';
            oThink.innerHTML=val;
        }else if(select=='close'){
            if( oThink.style.display=="none"){return;}
            oThink.style.display="none";
            oThink.innerHTML='';
        }
    }

    oThink.onclick=function(e){//鼠标点击联想值记录并跳转
        e=e||window.event;
        var target=e.target||e.srcElement;
        oSearch.value=target.innerHTML;
        oForm.submit();
    }

    oThink.onmouseover=function(e){//设置鼠标mouseover样式(配合css使用)
        e=e||window.event;
        var target=e.target||e.srcElement;
        if(target.parentNode.id==thinkId){
            target.className='current';
        }
    }

    oThink.onmouseout=function(e){//设置鼠标 mouseout 样式(配合css使用)
        e=e||window.event;
        var target=e.target||e.srcElement;
        if(target.parentNode.id==thinkId){
            target.className='';
        }
    }

    function closeThink(e){//输入框失去焦点
        e=e||window.event;
        var target=e.target||e.srcElement;
        if(target.parentNode.id!==thinkId&&target.id!=searchId){
            setThinks('close');//关闭联想列表
        }
    }
}
document.getElementById("form").onsubmit = function(){
    var obj = document.getElementById("search").value;
    obj = obj.replace(/ /gi,'').replace(/ /gi,'');
    if(obj.length==0)
    {
        return false;
    }
};


















