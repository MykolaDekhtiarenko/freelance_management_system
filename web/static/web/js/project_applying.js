var CONFIRMATION_MESSAGE = 'Ви впевнені, що бажаєте розпочати проект?\n(Цю дію неможливо відмінити)';

$(document).ready(function () {
    $('.project-information').fadeIn(500);
    $('.project-news').fadeIn(500);

    $('#begin_project_btn').on('click', function (e) {
        if (!confirm(CONFIRMATION_MESSAGE)) return;
        $.ajax({
            url: "/api/project/" + $(this).attr('project_id') + '/',
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify({'id': $(this).attr('project_id'), 'stage': 'D'}),
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            success: function (response) {
                location.reload();
            },
            error: function (xhr, errmsg, err) {
                //TO-DO error!!
                console.error(xhr.status + ": " + xhr.responseText);
            }
        });
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