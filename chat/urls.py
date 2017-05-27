from django.conf.urls import include, url
from rest_framework import routers
from chat.views import *


urlpatterns = [
    url(r'^(?P<label>[\w-]{,50})/$', chat_room, name='chat_room'),
]