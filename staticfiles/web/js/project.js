/**
 * Created by g_f0x on 21.06.17.
 */
$(document).ready(function () {

    $('#add_task_btn').click(function () {
        var task_data = {

            'stage': 'W',
            'project': $('#project_id_hidden').val(),
            'deadline': $('#tsk_deadline').val(),
            'description': $('#task_descr').val(),
            'developers': [5, 4],

            // 'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
        };
        console.log(task_data);
        $.ajax({
            url: "/api/task/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(task_data),
             beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            success: function (json) {
                console.log('Request OK');
            },
            error: function (xhr, errmsg, err) {
                console.error(xhr.status + ": " + xhr.responseText);
            }
        });
        // console.warn($('#task_team').find("option:selected"))
        clearAddTaskInputs();
    });
});

function clearAddTaskInputs() {

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

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function formatDate(date) {
    return date.slice(0, 10)+'T'+date.slice(11)
}