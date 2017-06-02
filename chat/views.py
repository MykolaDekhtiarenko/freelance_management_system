from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from chat.models import *


#Для методів класу використовуй: @method_decorator(login_required)

@login_required
def chat_room(request, label):
    print(request.user)
    room, created = Project.objects.get_or_create(chatRoom=label)
    print("Room belongs to ", room.name)
    messages = reversed(room.messages.order_by('-timestamp')[:50])
    return render(request, "chat/room.html", {
        'room': room,
        'messages': messages,
    })
