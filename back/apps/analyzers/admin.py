# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import *

admin.site.register(Analyzer)
admin.site.register(AnalyzerSession)
admin.site.register(Tag)
admin.site.register(TagHistory)
