# -*- coding: utf-8 -*-
from rest_framework.viewsets import ModelViewSet
from .serializers import * 


class SpiderViewSet(ModelViewSet):
	queryset         = Spider.objects.all()
	serializer_class = SpiderSerializer


class SessionViewSet(ModelViewSet):
	queryset         = Session.objects.all()
	serializer_class = SessionSerializer
