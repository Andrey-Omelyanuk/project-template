from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.urls import path, include
from rest_framework import routers
from apps.core.rest.router import core


router = routers.DefaultRouter(trailing_slash=True)
core        (router)

urlpatterns = [
    path('__debug__/'           , include('debug_toolbar.urls')),
    path('healthcheck'          , lambda request: JsonResponse({'status': 'OK'}), name='healthcheck'),
    path('auth/'                , include('allauth.urls')),
    path('api/'                 , include(router.urls)),
    path(''                    , admin.site.urls),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
