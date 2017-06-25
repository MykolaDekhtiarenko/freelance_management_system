/**
 * Created by mykola.dekhtiarenko on 24.06.17.
 */
$(document).ready(function () {

    $("#add-project").on('click', function (e) {
        e.stopImmediatePropagation();
        var project_data = {
            "name": $('#project-title').val(),
            "description": $('#project-description').val(),
            "startDate": $('#date1').val(),
            "endDate": $('#date2').val()
        };
        if (project_data.name <= 0) {
            reportError('You should name your project!');
            return;
        }
        if (project_data.description <= 0) {
            reportError('Description is mandatory field.');
            return;
        }
        $.ajax({
            url: "/api/project/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(project_data),
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            success: function (responce) {
                console.log(responce);
                console.log('Request OK');
                addProjectCard(responce);
            },
            error: function (xhr) {
                console.error(xhr.status + ": " + xhr.responseText);
            }
        });

        cleanModal();

        $('#myModal').fadeOut(200);

    });

});

function addProjectCard(data) {
    $projectCard = $("<div class='grid-item is-moved'>"
            +"<div class='square-box pull-right new-project-box-bacground'>"
              +"<a href='/project/"+data.id+"' type='submit' class='button button-5 button-5b icon-cart'><i class='fa fa-arrow-right'></i><span> Деталі </span></a>"
                +"</div>"
                +"<div class='info-box'>"
                    +"<h2>"+data.name+"</h2>"
                    +"<text><span>Deadline:</span>"+ data.endDate+"</text>"
                +"</div>"
            +"</div>");

    $('#project-list').append($projectCard);
}

function cleanModal() {
    $('#project-title').val("");
    $('#project-description').val("");
    $('#datetimepicker1').val("");
    $('#datetimepicker2').val("");
}
function reportError(msg) {
    $('#error-message').html(msg);
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

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