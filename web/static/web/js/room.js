$(document).ready(function(){ 
    $("#toggle").click(function(event){
        $(".сhat-room").animate({width:'toggle'},350);
            var hidden = $('.chat-room');
             if (hidden.hasClass('visible')){
                 setTimeout(function(){   $(".task-grid").removeClass("col-sm-12").addClass("col-sm-9")},600);
             

                 hidden.animate({"right":"0px"}, "slow").removeClass('visible');
                 $("#toggle").animate({"right":"100%"}, "slow").removeClass('visible');
                 $(this).toggleClass('glyphicon glyphicon-menu-left glyphicon glyphicon-menu-right');
             } else {
                                  $(".task-grid").removeClass("col-sm-9").addClass("col-sm-12");

                 hidden.animate({"right":"-90%"}, "slow").addClass('visible');
                 $("#toggle").animate({"right":"10%"}, "slow").addClass('visible');
                 $(this).toggleClass('glyphicon glyphicon-menu-left glyphicon glyphicon-menu-right');
             }
    });
}); 
