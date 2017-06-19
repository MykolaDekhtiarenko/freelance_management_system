$(document).ready(function(event,event2){
    $("#toggle").click(function(){
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
        modal.fadeIn(300);
        modal.css("display","block");
    });
    span.click(function(){
        modal.fadeOut(200);
    });
    window.click=function(event){
        if(event.target==modal){
            modal.fadeOut(200);
            modal.css("display","none");

        }
        event.stopPropagation();
    }
    var modal2 = $('#addTask');
    var btn2 = $("#add");
    var span2=$(".close");
    btn2.click(function(){
        modal2.fadeIn(300);
        modal2.css("display","block");
    });
    span2.click(function(){
        modal2.fadeOut(200);
    });
    window.click=function(event2){
        if(event2.target==modal2){
            modal2.fadeOut(200);
            modal2.css("display","none");
            event2.stopPropagation();
        }
    }
    var myDiv = $('.description');
    myDiv.text(myDiv.text().substring(0,30));
    myDiv.append("...");
});

