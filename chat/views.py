from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.decorators import method_decorator

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

# def new_room(request):
#     """
#     Randomly create a new room, and redirect to it.
#     """
#     new_room = None
#     while not new_room:
#         with transaction.atomic():
#             label = id_generator(10)
#             if Room.objects.filter(label=label).exists():
#                 continue
#             new_room = Room.objects.create(label=label)
#     return redirect(chat_room, label=label)
#
# def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
#     return ''.join(random.choice(chars) for _ in range(size))
