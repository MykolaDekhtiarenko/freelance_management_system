/**
 * Created by g_f0x on 21.06.17.
 */
$(document).ready(function () {
    $('#add_task_btn').click(function () {
       console.log('n1ce');
       var task_data = {

               'stage': 'W',
               'project': $('#project_id_hidden').val(),
               'deadline': $('#task_deadline').val(),
               'description': $('#task_descr').val(),
               'developers': [5],

           'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
       };
       console.log(task_data);
       $.ajax({
            url : "/api/task/",
            type : "POST",
            contentType: "application/json",
            data : JSON.stringify(task_data),
        success : function(json) {
            console.log('Request OK');
        },
        error : function(xhr,errmsg,err) {
            console.error(xhr.status + ": " + xhr.responseText);
        }
        });
       // console.warn($('#task_team').find("option:selected"))
        clearAddTaskInputs();
    });
});

function clearAddTaskInputs() {
    
}