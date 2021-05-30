# -*- coding: utf-8 -*-
from rest_framework.viewsets import ModelViewSet
from .serializers import * 


class SpiderViewSet(ModelViewSet):
	queryset         = Spider.objects.all()
	serializer_class = SpiderSerializer


class SessionViewSet(ModelViewSet):
	queryset         = Session.objects.all()
	serializer_class = SessionSerializer


class SiteViewSet(ModelViewSet):
	queryset         = Site.objects.all()
	serializer_class = SiteSerializer


class PageViewSet(ModelViewSet):
	queryset         = Page.objects.all()
	serializer_class = PageSerializer


class ArticleViewSet(ModelViewSet):
	queryset         = Article.objects.all()
	serializer_class = ArticleSerializer 


class ArticleSnapshotViewSet(ModelViewSet):
	queryset         = ArticleSnapshot.objects.all()
	serializer_class = ArticleSnapshotSerializer 
