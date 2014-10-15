(function(){
    var oSesponse_ans=document.getElementById('response_ans');
    $('#response_ans ul').click(function(){
        var oType=$(this).attr('type');
        if(oType=='open'){
            $(this).prev('p').addClass("ph");
            $(this).attr('type','close');
            $(this).text('显示更多');
        }else{
            $(this).prev('p').removeClass("ph");
            $(this).attr('type','open');
            $(this).text('收起更多');
        }

    });

}());