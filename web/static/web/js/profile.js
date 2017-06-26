var theOddOnes = $('.skill');
    for(var i=0; i<theOddOnes.length; i++){
        var colors = ['#417e82', '#fcc971', '#1eb2a3', '#72a3a1', '#f7a204', '#6dc4b4'];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
                   theOddOnes[i].style.backgroundColor=random_color;
        }