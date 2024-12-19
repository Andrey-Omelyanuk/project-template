from django.contrib import admin
from .models import * 

admin.site.register(Org)
admin.site.register(OrgUser)
admin.site.register(OrgUserGroup)
admin.site.register(OrgUserInOrgUserGroup)

