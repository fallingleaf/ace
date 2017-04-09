from django.conf import settings
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api import views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet, base_name='posts')

urlpatterns = [
    url(r'^signup/$', views.signup, name='signup'),
] + router.urls
