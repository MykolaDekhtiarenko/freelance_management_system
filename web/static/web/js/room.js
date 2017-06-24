var theOddOnes = $('.member');
    for(var i=0; i<theOddOnes.length; i++){
        var colors = ['#417e82', '#fcc971', '#1eb2a3', '#72a3a1', '#f7a204', '#6dc4b4'];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
                   theOddOnes[i].style.backgroundColor=random_color;
        }
$(document).ready(function(event,event2){
    $("#chat").animate({ scrollTop: $("#chat")[0].scrollHeight}, 500);
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



    $('.task-grid').on('click', '.details', function(){
        var card = $(this).parent().parent();
        var modal = card.find('#myModal');
        modal.fadeIn(300);
        modal.css("display","block");
    });
    $('.task-grid').on('click', '.close', function(){
        modal = $(this).parent().parent();
        modal.fadeOut(200);
        modal.css("display","none");
    });
    // window.click=function(event){
    //     if(event.target==$('#myModal')){
    //         $('#myModal').fadeOut(200);
    //         $('#myModal').css("display","none");
    //
    //     }
    //     event.stopPropagation();
    // }

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
    // var myDiv = $('.description');
    // myDiv.text(myDiv.text().substring(0,30));
    // myDiv.append("...");

});

