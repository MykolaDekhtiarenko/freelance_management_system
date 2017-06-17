$(document).ready(function(){ 
    $("#toggle").click(function(event){
        $(".сhat-room").animate({width:'toggle'},300);
            var hidden = $('.chat-room');
             if (hidden.hasClass('visible')){
                 $(".task-grid").removeClass("col-sm-12").addClass("col-sm-9");
                 hidden.animate({"right":"0px"}, 300).removeClass('visible');
                 $("#toggle").animate({"right":"90%"}, 300).removeClass('visible');
                 $(this).toggleClass('glyphicon glyphicon-menu-left glyphicon glyphicon-menu-right');
             } else {
                 $(".task-grid").removeClass("col-sm-9").addClass("col-sm-12");
                 hidden.animate({"right":"-85%"}, 300).addClass('visible');
                 $("#toggle").animate({"right":"5%"}, 300).addClass('visible');
                 $(this).toggleClass('glyphicon glyphicon-menu-left glyphicon glyphicon-menu-right');
             }
    });
    var modal = $('#myModal');
    var btn = $(".details");
    var span=$(".close");
    btn.click(function(){
        modal.css("display","block");
    });
    span.click(function(){
        modal.css("display","none");
    });
    window.click=function(event){
        if(event.target==modal){
            modal.css("display","none");
        }
    }
});


