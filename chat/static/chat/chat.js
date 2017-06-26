/**
 * Created by mykola.dekhtiarenko on 21.05.17.
 */
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
var chat_socket = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host+'/chat/'+CHATROOM);

$('#chatform').on('submit', function(event) {
    event.stopImmediatePropagation();
    var message = {
        message: $('#message').val(),
    }
    $('#message').val('');
    chat_socket.send(JSON.stringify(message));
    return false;
});

chat_socket.onmessage = function(message) {
    var data = JSON.parse(message.data);
    $('#chat').append(
        '<div class="username'+ ((data.user===USERNAME)?' my-username':'')+'">'+((data.user===USERNAME)?'You: ':data.user.first_name+" "+data.user.last_name+": ")+'</div>'+
        '<div class="message-container">'+
        '<div class="message'+((data.user===USERNAME)?' my-message':'')+'">'+
        '<div class="message-text">'+ data.message + '</div>'+
        '<div class="timestamp">' + data.timestamp + '</div>'+
        '</div>'+
        '</div>'
    );
    $("#chat").animate({ scrollTop: $("#chat")[0].scrollHeight}, 500);
};

$('#message').keypress(function (e) {
 var key = e.which;
 if(key == 13){
    $('#chatform').submit();
    return false;
  }
});

$('#send-message').on('click', function (e) {
    e.stopImmediatePropagation();
    $('#chatform').submit();
    return false;
});