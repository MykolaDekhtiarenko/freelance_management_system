$(document).ready(function () {
    // $('.selectpicker').selectpicker('refresh');

    $('#portfolio_update').on('click', function () {
        var skills = [];
        $('#portfolio_skills').find('option:selected').each(function (i, e) {skills.push(e.value);});
        var portfolio = {
          'about': $('#portfolio_about').val(),
            'education': $('#portfolio_edu').val(),
            'experience': $('#portfolio_exp').val(),
            'phone': $('#portfolio_phone').val(),
            'skills': skills
        };
        if(!checkFields(portfolio)) return;
        $.ajax({
            url: "/api/portfolio/" + $('#portfolio_id').val() + '/',
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify(portfolio),
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

    $('#portfolio_post').on('click', function () {
        var skills = [];
        $('#portfolio_skills').find('option:selected').each(function (i, e) {skills.push(e.value);});
        var portfolio = {
            'about': $('#portfolio_about').val(),
            'education': $('#portfolio_edu').val(),
            'experience': $('#portfolio_exp').val(),
            'phone': $('#portfolio_phone').val(),
            'skills': skills
        };
        if(!checkFields(portfolio)) return;
        $.ajax({
            url: "/api/portfolio/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(portfolio),
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            },
            success: function (response) {
                console.log('Request OK');
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

function checkFields(portfolio) {
    var errField = $('#portfolio_err');
    if (portfolio.education.length===0) {errField.text('Include info \'education\''); return false;}
    if (portfolio.experience.length===0) {errField.text('Include info \'experience\''); return false;}
    if (portfolio.about.length===0) {errField.text('Include info \'about\''); return false;}
    if (portfolio.phone.length===0) {errField.text('Include info \'phone\''); return false;}
    errField.text('');
    return true;
}