from django.contrib import admin
from .models import *


admin.site.register(Course)
admin.site.register(CourseChapter)
admin.site.register(Lesson)
admin.site.register(LessonBlock)

