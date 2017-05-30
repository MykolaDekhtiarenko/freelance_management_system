from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api.views import *


router = DefaultRouter()
router.register(r'portfolio', PortfolioModelViewSet, 'Portfolio')
router.register(r'project', ProjectModelViewSet, 'Project')
router.register(r'task', TaskModelViewSet, 'Task')
router.register(r'comment', CommentModelViewSet, 'Comment')
router.register(r'application', ApplicationModelViewSet, 'Application')
router.register(r'profile', ProfileModelViewSet, 'Profile')



urlpatterns = [
    # url(r'portfolio', PortfolioModelViewSet.as_view()),
    url(r'^', include(router.urls, namespace='api')),
]