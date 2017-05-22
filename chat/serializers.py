from chat.models import *
from rest_framework import serializers


class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ('name', 'label')