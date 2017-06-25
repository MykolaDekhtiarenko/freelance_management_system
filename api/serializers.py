import datetime

from django.contrib.auth.models import Group

from api.models import *
from rest_framework import serializers
from django.template.defaultfilters import slugify


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
                  'chatRoom', 'creator', 'endDate', 'startDate')
        extra_kwargs = {
            'chatRoom': {
                'read_only': True
            }
        }
    def create(self, validated_data):
        return Project.objects.create(
            creator=self.context['request'].user, **validated_data,
            chatRoom=slugify(str(self.context['request'].user)+'-'+validated_data['name'])
        )

class TaskSerializer(serializers.ModelSerializer):
    developers = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    class Meta:
        model = Task
        fields = ('id', 'description', 'deadline', 'stage', 'project', 'developers')

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
    def create(self, validated_data):
        return Comment.objects.create(
            user = self.context['request'].user, **validated_data
        )

class ApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Application
        fields = '__all__'
    def create(self, validated_data):
        return Application.objects.create(
            user=self.context['request'].user, **validated_data
        )

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("password", "email", "first_name", "last_name")
        extra_kwargs = {'password': {'write_only': True}, }


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model= Profile
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        username = user_data["email"]
        role = validated_data.pop('role')
        if role not in Profile.RoleValues.values:
            raise str("Unsupported role exeption. Only %s supported. You set: '%s'.", Profile.RoleValues.values, role)
        user = User(username=username, **user_data)
        user.set_password(user_data["password"])
        user.save()
        profile = Profile.objects.create(user=user, role=role)
        group, created = Group.objects.get_or_create(name=role)
        user.groups.add(group)
        return profile


