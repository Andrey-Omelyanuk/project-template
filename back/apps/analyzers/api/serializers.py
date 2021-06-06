# -*- coding: utf-8 -*-
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ..models import *


class AnalyzerSerializer(ModelSerializer):
	class Meta:
		model = Analyzer 
		fields = '__all__'


class AnalyzerSessionSerializer(ModelSerializer):
	analyzer_id = PrimaryKeyRelatedField(source='analyzer', queryset=Analyzer.objects.all())
	class Meta:
		model = AnalyzerSession
		exclude = ('analyzer',)


class TagSerializer(ModelSerializer):
	class Meta:
		model =Tag 
		fields = '__all__'

class TagHistorySerializer(ModelSerializer):
	article_id = PrimaryKeyRelatedField(source='article', queryset=Article.objects.all())
	tag_id  = PrimaryKeyRelatedField(source='tag' , queryset=Tag.objects.all())
	class Meta:
		model = TagHistory 
		exclude = ('article', 'tag', )
