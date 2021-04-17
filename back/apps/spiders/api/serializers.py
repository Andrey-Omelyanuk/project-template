# -*- coding: utf-8 -*-
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ..models import *


class SpiderSerializer(ModelSerializer):
	class Meta:
		model = Spider 
		fields = '__all__'


class SessionSerializer(ModelSerializer):
	# site_id = PrimaryKeyRelatedField(source='spider', queryset=Site.objects.all())
	class Meta:
		model = Session
		fields = '__all__'
		# exclude = ('site',)
