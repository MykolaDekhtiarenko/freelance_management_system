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

# this should work (but i'm not sure)
class ProjectSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'stage',
                  'chatRoom', 'creator')

class TaskSerializer(serializers.ModelSerializer):
    developers = UserSerializer(read_only=True, many=True)
    class Meta:
        model = Task
        fields = ('description', 'deadline', 'stage', 'project', 'developers')


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Application
        fields = '__all__'