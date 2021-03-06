var items = document.querySelectorAll('.grid-a .grid-item');
var isMoved = false;

var theOddOnes = document.getElementsByClassName('square-box');
    for(var i=0; i<theOddOnes.length; i++){
        var colors = ['#417e82', '#fcc971', '#1eb2a3', '#72a3a1', '#f7a204', '#6dc4b4'];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
                   theOddOnes[i].style.backgroundColor=random_color;
        }

window.onload = function() {
  // toggle flag
  isMoved = !isMoved;

  for ( var i=0; i < items.length; i++ ) {
    // get function in closure, so i can iterate
    var toggleItemMove = getToggleItemMove( i );
    // reverse stagger order
    var delay = isMoved ? ( items.length - i - 1 ) : i;
    delay *= 100;
    // stagger transition with setTimeout
    setTimeout( toggleItemMove, delay );
  }
};

function getToggleItemMove( i ) {
  var item = items[i];
  return function() {
    item.classList.toggle('is-moved');
  }
}

$(document).ready(function(){ 
    $('.top-segment').fadeIn(2000,function(){
     });

});
   var modal = $('#myModal');
    var btn = $(".add_project_button");
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