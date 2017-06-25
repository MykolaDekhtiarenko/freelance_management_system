from django.test import TestCase
from django.contrib.auth.models import AnonymousUser, User
from django.test import TestCase, RequestFactory
import unittest
from selenium import webdriver
# Create your tests here.
from django.urls import reverse
from .views import home, signup
from django.http    import HttpRequest
from api.models import *
from web.views import *


class TestCalls(TestCase):
    def test_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
    def test_login(self):
        response = self.client.get('/login/')
        self.assertEqual(response.status_code,200)
"""
class TestSignup(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_signup_fire(self):
        self.driver.get("http://localhost:8001/")
        self.driver.find_element_by_id('add_task_btn').click()


        self.assertIn("http://localhost:8000/", self.driver.current_url)

    def tearDown(self):
        self.driver.quit

"""
class TestPortfolio(TestCase):
    factory = RequestFactory()
    def test_portfolio(self):
        user = User.objects.create()
        request = HttpRequest()
        request.user = user
        request.user.profile = Profile.objects.create(user=user)
        request.user.profile.role = Profile.RoleValues.developer
        resp = portfolio(request)
        self.assertEqual(resp.status_code, 200)
    def test_portfolio_of_superuser(self):
        user = User.objects.create()
        request = HttpRequest()
        request.user = user
        request.user.is_superuser=True

        resp = portfolio(request)
        self.assertRaises(Http404)
    def test_portfolio_of_not_dev(self):

        user = User.objects.create()
        request = HttpRequest()
        request.user = user
        request.user.profile = Profile.objects.create(user=user)
        request.user.profile.role = Profile.RoleValues.creator
        resp = portfolio(request)

        self.assertRaises(Http404)

    def test_home(self):
        user = User.objects.create()

        request = HttpRequest()
        request.user = user
        request.user.profile = Profile.objects.create(user=user)
        request.user.profile.role = Profile.RoleValues.creator
        resp = home(request)

        self.assertEqual(resp.status_code,200 )

    def test_signuap(self):
            user = User.objects.create()

            request = HttpRequest()
            request.user = user
            request.user.profile = Profile.objects.create(user=user)
            request.user.profile.role = Profile.RoleValues.creator
            resp = signup(request)

            self.assertEqual(resp.status_code, 200)
    def test_mixin(self):
        factory = RequestFactory()
        user = User.objects.create(username='joe', password='qwerty')
        request = self.factory.get('/rand')

        request.user = user
        request.user.profile = Profile.objects.create(user=user)
        request.user.profile.role = Profile.RoleValues.creator
        view = MyProjectsListView.as_view()
        response = view(request)
        self.assertEqual(response.status_code,200)

    def test_mixin_two(self):
            factory = RequestFactory()
            user = User.objects.create(username='joe', password='qwerty')
            request = self.factory.get('/rand')

            request.user = user
            request.user.profile = Profile.objects.create(user=user)
            request.user.profile.role = Profile.RoleValues.developer
            view = MyProjectsListView.as_view()
            response = view(request)
            self.assertEqual(response.status_code, 200)

    def test_mixin_three(self):
                factory = RequestFactory()
                user = User.objects.create(username='joe', password='qwerty')
                request = self.factory.get('/rand')

                request.user = user
                request.user.is_superuser = True

                view = MyProjectsListView.as_view()
                response = view(request)
                self.assertEqual(response.status_code, 200)
                self.assertRaises( Http404())
    def test_mixin_four(self):
            factory = RequestFactory()
            user = User.objects.create(username='joe', password='qwerty')
            request = self.factory.get('/rand')

            request.user = user
            request.user.profile = Profile.objects.create(user=user)
            request.user.profile.role = Profile.RoleValues.developer
            view = MyApplicationsListView.as_view()
            response = view(request)
            self.assertEqual(response.status_code, 200)
    def test_mixin_five(self):
            factory = RequestFactory()
            user = User.objects.create(username='joe', password='qwerty')
            request = self.factory.get('/rand')

            request.user = user
            request.user.profile = Profile.objects.create(user=user)
            request.user.profile.role = Profile.RoleValues.developer
            view = MyTasksListView.as_view()
            response = view(request)
            self.assertEqual(response.status_code, 200)

    def test_mixin_six(self):
        factory = RequestFactory()
        user = User.objects.create(username='joe', password='qwerty')
        request = self.factory.get('/rand')

        request.user = user
        request.user.is_superuser=True
        view = MyTasksListView.as_view()
        response = view(request)
        self.assertRaises(Http404)

    def test_mixin_seven(self):
            factory = RequestFactory()
            user = User.objects.create(username='joe', password='qwerty')
            request = self.factory.get('/rand')

            request.user = user
            request.user.profile = Profile.objects.create(user=user)
            request.user.profile.role = Profile.RoleValues.developer
            view = ProjectDetailView.as_view()
            response = view(request)

            self.assertEqual(response.status_code, 200)
















