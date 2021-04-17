from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from rest_framework import routers
from .views.get_settings import get_settings
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, )
from apps.spiders.api.views import *

router = routers.DefaultRouter(trailing_slash=True)
router.register(r'spider'   , SpiderViewSet)
router.register(r'session'   , SessionViewSet)


urlpatterns = [
    path('api/settings/'        , get_settings),
    path('api/token/'           , TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/'   , TokenRefreshView   .as_view(), name='token_refresh'),
	path('api/'                 , include(router.urls)),
    path('admin/'               , admin.site.urls),
]
