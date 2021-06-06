from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from rest_framework import routers
from .views.get_settings import get_settings
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, )
from apps.spiders.api.views import SpiderViewSet, SessionViewSet as SpiderSessionViewSet, SiteViewSet, PageViewSet, ArticleViewSet, ArticleSnapshotViewSet
from apps.analyzers.api.views import AnalyzerViewSet, AnalyzerSessionViewSet, TagViewSet, TagHistoryViewSet


router = routers.DefaultRouter(trailing_slash=True)
router.register(r'spider'           , SpiderViewSet)
router.register(r'spider-session'   , SpiderSessionViewSet)
router.register(r'site'             , SiteViewSet)
router.register(r'page'             , PageViewSet)
router.register(r'article'          , ArticleViewSet)
router.register(r'article-snapshot' , ArticleSnapshotViewSet)

router.register(r'analyzer'         , AnalyzerViewSet)
router.register(r'analyzer-session' , AnalyzerSessionViewSet)
router.register(r'tag'              , TagViewSet)
router.register(r'tag-history'      , TagHistoryViewSet)

urlpatterns = [
    path('api/settings/'        , get_settings),
    path('api/token/'           , TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/'   , TokenRefreshView   .as_view(), name='token_refresh'),
	path('api/'                 , include(router.urls)),
    path('admin/'               , admin.site.urls),
]
