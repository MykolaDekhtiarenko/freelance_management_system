from django.conf.urls import url
from web.views import home
from django.contrib.auth import views

# We are adding a URL called /home
urlpatterns = [
    url(r'^$', home),
    url(r'^login/$', views.login, {'template_name': 'registration/login.html'}, name='login'),
    url(r'^logout/$', views.logout, {'next_page': '/login'}),


]