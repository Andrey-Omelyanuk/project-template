# -*- coding: utf-8 -*-
from rest_framework.viewsets import ModelViewSet
from .serializers import * 


class AnalyzerViewSet(ModelViewSet):
	queryset         = Analyzer.objects.all()
	serializer_class = AnalyzerSerializer


class AnalyzerSessionViewSet(ModelViewSet):
	queryset         = AnalyzerSession.objects.all()
	serializer_class = AnalyzerSessionSerializer


class TagViewSet(ModelViewSet):
	queryset         = Tag.objects.all()
	serializer_class = TagSerializer


class TagHistoryViewSet(ModelViewSet):
	queryset         = TagHistory.objects.all()
	serializer_class = TagHistorySerializer
