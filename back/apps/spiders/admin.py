# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import *

admin.site.register(Spider)
admin.site.register(Session)
admin.site.register(Site)
admin.site.register(Page)
admin.site.register(Article)
admin.site.register(ArticleSnapshot)
