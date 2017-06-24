/**
 * Created by g_f0x on 21.06.17.
 */
var DATE_TIME_REGEXP=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

$(document).ready(function () {

    $('#add_task_btn').click(function () {
        var devs = [];
        $('#task_team').find('option:selected').each(function (index, elem) {devs.push(elem.id)});
        var task_data = {
            'stage': 'W',
            'project': $('#project_id_hidden').val(),
            'deadline': formatDate($('#tsk_deadline').val()),
            'description': $('#task_descr').val(),
            'developers': devs
        };
        if(!DATE_TIME_REGEXP.test(task_data.deadline)) {
            reportError($('#tsk_deadline'), 'Please input valid time using selector');
            return;
        }
        if(task_data.description.length===0) {
            reportError($('#task_descr'), 'Please enter task description');
            return;
        }
        $('#add_task_error').text('');
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
        clearAddTaskInputs();
    });
});
function clearAddTaskInputs() {
    $('#tsk_deadline').val('');
    $('#task_descr').val('');
    $('#task_team').selectpicker('deselectAll');
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

function reportError(elem, message){
    //TO-DO elem.addAttr('has-error');
    $('#add_task_error').text(message);
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function formatDate(date) {
    return date.slice(0, 10)+'T'+date.slice(11)
}