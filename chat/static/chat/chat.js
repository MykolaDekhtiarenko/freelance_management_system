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
    $('#chat').append('<div '
        +((data.user===USERNAME)?'class="message_my"':'class="message_other"')
        +'>'+ '<span>' + data.timestamp + '</span>'
        + ' <span>' + data.user + '</span>'
        + ' <span>' + data.message + ' </span>'
    + '</div>');
};

$('#message').keypress(function (e) {
 var key = e.which;
 if(key == 13)
  {
    $('#chatform').submit();
    return false;
  }
});