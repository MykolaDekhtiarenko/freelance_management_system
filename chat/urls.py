from django.conf.urls import include, url
from rest_framework import routers
from chat.views import *


router = routers.DefaultRouter()
router.register(r'room', RoomViewSet)

urlpatterns = [

    url(r'^', include(router.urls)),

    url(r'^new/$', new_room, name='new_room'),
    url(r'^(?P<label>[\w-]{,50})/$', chat_room, name='chat_room'),
]