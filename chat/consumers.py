import json
from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http
from api.models import Project



@channel_session_user_from_http
def ws_connect(message):
    prefix, label = message['path'].strip('/').split('/')
    room = Project.objects.get(chatRoom=label)
    message.reply_channel.send({"accept": True})
    Group('chat-' + label).add(message.reply_channel)
    message.channel_session['room'] = room.chatRoom



@channel_session_user
def ws_receive(message):
    chatRoom = message.channel_session['room']
    project = Project.objects.get(chatRoom=chatRoom)
    data = json.loads(message['text'])
    m = project.messages.create(user=message.user, message=data['message'])
    responce_message = m.as_dict()
    responce_message["first_name"] = message.user.first_name
    responce_message["last_name"] = message.user.last_name
    Group('chat-' + chatRoom).send({'text': json.dumps(responce_message)})


@channel_session_user
def ws_disconnect(message):
    try:
        label = message.channel_session['room']
        # room = Room.objects.get(label=label)
        Group('chat-' + label, channel_layer=message.channel_layer).discard(message.reply_channel)
    except (KeyError, Project.DoesNotExist):
        pass