from api.models import *
from rest_framework import serializers


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PortfolioSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(read_only=True, many=True)
    class Meta:
        model = Portfolio
        fields = ('about', 'education', 'experience', 'phone', 'skills')

    def create(self, validated_data):
        return Portfolio.objects.create(
            user = self.context['request'].user, **validated_data
        )
