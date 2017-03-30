from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from core import views

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-list/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^auth/token/', obtain_jwt_token),
    url(r'^auth/token/refresh/', refresh_jwt_token),
    url(r'^', views.home, name='index'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
