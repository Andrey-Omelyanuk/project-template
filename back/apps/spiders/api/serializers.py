# -*- coding: utf-8 -*-
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ..models import *


class SpiderSerializer(ModelSerializer):
	class Meta:
		model = Spider 
		fields = '__all__'


class SessionSerializer(ModelSerializer):
	site_id = PrimaryKeyRelatedField(source='site', queryset=Site.objects.all())
	class Meta:
		model = Session
		exclude = ('site',)


class SiteSerializer(ModelSerializer):
	class Meta:
		model = Site
		fields = '__all__'


class PageSerializer(ModelSerializer):
	site_id = PrimaryKeyRelatedField(source='site', queryset=Site.objects.all())
	class Meta:
		model = Page
		exclude = ('site',)


class ArticleSerializer(ModelSerializer):
	site_id = PrimaryKeyRelatedField(source='site', queryset=Site.objects.all())
	class Meta:
		model = Article 
		exclude = ('site',)


class ArticleSnapshotSerializer(ModelSerializer):
	session_id = PrimaryKeyRelatedField(source='session' , queryset=Site.objects.all())
	page_id    = PrimaryKeyRelatedField(source='page'    , queryset=Site.objects.all())
	goods_id   = PrimaryKeyRelatedField(source='goods'   , queryset=Site.objects.all())
	class Meta:
		model = ArticleSnapshot
		exclude = ('session', 'page', 'goods', )

