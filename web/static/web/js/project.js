/**
 * Created by g_f0x on 21.06.17.
 */
var DATE_TIME_REGEXP=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

$(document).ready(function () {

    $('#add_task_btn').click(function () {
        var devs = [];
        $('#task_team').find('option:selected').each(function (index, elem) {devs.push(elem.id)});
        var dev_names = [];
        $('#task_team').find('option:selected').each(function (index, elem) {dev_names.push(elem.text)});
        var task_data = {
            'stage': 'W',
            'project': $('#project_id_hidden').val(),
            'deadline': dateToISOFormate($('#tsk_deadline').val()),
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
                addTaskCard(json, dev_names);
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

function dateToISOFormate(date) {
    return date.slice(0, 10)+'T'+date.slice(11)
}

function dateFromISOToCard(isoDate) {
    return isoDate.slice(8,10)+'.'+isoDate.slice(5,7)+'.'+isoDate.slice(0,4);
}
function dateTimeFromISOToCard(isoDateTime){
    return isoDateTime.slice(8,10)+'.'+isoDateTime.slice(5,7)+'.'+isoDateTime.slice(0,4)+' '+isoDateTime.slice(11,13)
        +':'+isoDateTime.slice(14,16);
}
function addTaskCard(json, dev_names) {
    $devsInfo = '';
    console.log(dev_names);
    if (dev_names.length===0) $devsInfo+='<span> відсутні</span>';
    else $(dev_names).each(function (i,e) {
        $devsInfo+='<span class="member">'+e+'</span>';
    });
    console.log(json);
    var $taskInfo = $('<div class="task-item col-lg-4 col-md-6 col-sm-6 col-xs-12">'
                    +'<div class="card">'
                        +'<div class="information">'
                            +'<p class="deadline">'+dateFromISOToCard(json.deadline)+'</p>'
                            +'<p class="description">'+json.description+'</p>'
                            +'<button id="details" class="details glyphicon glyphicon-menu-right"></button></div>'
                        +'<div id="myModal" class="modal ">'
                            +'<div class="modal-content ">'
                                +'<span id="close" class="close">&times;</span>'
                                +'<div class="input-group modal-information col-xs-12">'
                                    +'<div class="group">'
                                        +'<label for="group"> Учасники: </label>'
                                        +$devsInfo
                                    +'</div>'
                                    +'<div class="modal-description col-xs-12">'+json.description+'</div>'
                                    +'<div class="half-width-parent">'
                                        +'<div class="half-width">'
                                            +'<label for="modal-deadline"> Зробити до: </label>'
                                            +'<span class="modal-deadline"> '+dateTimeFromISOToCard(json.deadline)+'</span>'
                                        +'</div>'
                                        +'<div class="half-width right">'
                                            +'<select class="selectpicker stage-picker" task_id="'+json.id+'">'
                                                +'<option name="W" selected>Очікування</option>'
                                                +'<option name="P">В процесі</option>'
                                                +'<option name="D">Зроблено</option>'
                                                +'<option name="F">Провалено</option>'
                                            +'</select></div></div>'
                                    +'<div class="comments-group"><hr>'
                                        +'<textarea class="form-control" rows="3" id="comm_in_'+json.id+'"></textarea>'
                                        +'<div class="col-xs-12 no-margin no-padding">'
                                            +'<button type="submit" class="button-send send_comment" task_id="'+json.id+'" >Надіслати</button>'
                                        +'</div>'
                                        +'<p class="comments-header"> Коментарі </p>'
                +'<hr><div id="comm_box_'+json.id+'">be the first</div></div></div></div></div></div></div>');
    $('.task-grid').append($taskInfo);
    $taskInfo.find('.selectpicker').selectpicker('refresh');
}

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
$('.task-grid').on('change', '.stage-picker', function (e) {
    e.stopImmediatePropagation();
    var task_id = $(this).attr('task_id');
    $.ajax({
            url: "/api/task/"+task_id+'/',
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify({'stage': $(this).find('option:selected').attr('name')}),
             beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            success: function (response) {
                console.log('Request OK');
            },
            error: function (xhr, errmsg, err) {
                //TO-DO error!!
                console.error(xhr.status + ": " + xhr.responseText);
            }
    });
});
$('.task-grid').on('click', '.send_comment', function (e) {
    var task_id = $(this).attr('task_id');
    var $commInput = $('#comm_in_'+task_id);
    var text = $commInput.val();
    $commInput.val('');
    console.log($commInput);
    console.log(text);
    $.ajax({
            url: "/api/comment/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({'task': task_id, 'text': text}),
             beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            success: function (response) {
                console.log('Request OK');
                addComment(response);
            },
            error: function (xhr, errmsg, err) {
                //TO-DO error!!
                console.error(xhr.status + ": " + xhr.responseText);
            }
    });
});

function addComment(json) {
    var $commBox = $('#comm_box_'+json.task);
    if($commBox.children().length===0) $commBox.text('');
    var $newComment = $('<div class="comment">'
        +'<p>'+json.timestamp+' by'
        +'<b> You</b></p>'
        +'<div class="comment-content">'
        +'<p>'+json.text+'</p>'
        +'</div><hr></div>');
    $commBox.append($newComment);
}