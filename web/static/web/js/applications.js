$('.container').on('click', '#decline', function(e){
    e.stopImmediatePropagation();
    $.ajax({
            url: "/api/application/"+$(this).attr('application')+"/",
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify({'status': 'R'}),
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            success: function (response) {
               console.log(response);
               console.log("OK")
               $('#bb_'+response.id).hide();
               $('#bb_'+response.id).parent().append("<h4>Відхилено</h4>");
            },
            error: function (xhr, errmsg, err) {
                console.error(xhr.status + ": " + xhr.responseText);
            }
    });
});

$('.container').on('click', '#accept', function(e){
    e.stopImmediatePropagation();
    $.ajax({
            url: "/api/application/"+$(this).attr('application')+"/",
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify({'status': 'A'}),
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            success: function (response) {
               console.log(response);
               console.log("OK");
                $('#bb_'+response.id).hide();
                $('#bb_'+response.id).parent().append("<h4>Прийнято</h4>");


            },
            error: function (xhr, errmsg, err) {
                console.error(xhr.status + ": " + xhr.responseText);
            }
    });
});

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}