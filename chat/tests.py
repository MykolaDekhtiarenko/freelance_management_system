from django.test import TestCase
from django.contrib.auth.models import AnonymousUser, User
from django.test import TestCase, RequestFactory
import unittest
from selenium import webdriver
# Create your tests here.
from django.urls import reverse
from web.views import home, signup
from django.http    import HttpRequest
from api.models import *
from web.views import *
from .views import *

class ChatTest(TestCase):
    def test_chat_room(self):
        user = User.objects.create(username='joe', password='qwerty')
        request = HttpRequest()
        request.user = user
        request.user.profile = Profile.objects.create(user=user)
        request.user.profile.role = Profile.RoleValues.developer
        resp = chat_room(request,'lable')
        self.assertEqual(resp.status_code, 200)
