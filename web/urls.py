from django.conf.urls import url
from django.contrib.auth import views
from web.views import *
# We are adding a URL called /home
urlpatterns = [
    url(r'^applications', MyApplicationsListView.as_view()),
    url(r'^portfolio', portfolio),
    url(r'^tasks', MyTasksListView.as_view()),
    url(r'^$', AllProjectsListView.as_view()),
    url(r'^myprojects', MyProjectsListView.as_view()),
    url(r'^project/(?P<pk>\d+)/$', ProjectDetailView.as_view()),
    url(r'^signup$', signup),
    url(r'^login/$', views.login, {'template_name': 'registration/login.html'}, name='login'),
    url(r'^logout/$', views.logout, {'next_page': '/login'}),
    url(r'^accounts/login/$', views.login, {'template_name': 'registration/login.html'}, name='login'),

]