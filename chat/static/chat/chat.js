/**
 * Created by mykola.dekhtiarenko on 21.05.17.
 */
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
// var chat_socket = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + window.location.pathname);
var chat_socket = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host+'/chat/'+CHATROOM);
// console.log(ws_scheme + '://' + window.location.host + window.location.pathname);
// console.warn(ws_scheme + '://' + window.location.host + '/'+CHATROOM);

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
    $('#chat').append('<div'
        +((message.user===USERNAME)?'class="message_my"':'class="message_other"')
        +'>'+ '<span>' + data.timestamp + '</span>'
        + '<span>' + data.user + '</span>'
        + '<span>' + data.message + ' </span>'
    + '</div>');
};