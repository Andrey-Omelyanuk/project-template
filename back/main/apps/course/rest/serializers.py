from django.contrib.auth import get_user_model
from rest_framework.serializers import PrimaryKeyRelatedField
from apps.core.rest.serializers import CoreModelSerializer
from apps.files.models import File
from ..models import *
User = get_user_model()


__all__ = [
    'CourseSerializer',
    'CourseUserSerializer',
    'CourseChapterSerializer',
    'LessonSerializer',
    'LessonBlockSerializer',
    'LessonUserStatusSerializer',
]


class CourseSerializer(CoreModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        expandable_fields = {
            'chapters': ('apps.course.rest.CourseChapterSerializer', {'many': True}),
            'users'   : ('apps.course.rest.CourseUserSerializer', {'many': True}),
        }


class CourseUserSerializer(CoreModelSerializer):
    course_id   = PrimaryKeyRelatedField(source='course', queryset=Course.objects.all())
    user_id     = PrimaryKeyRelatedField(source='user'  , queryset=User.objects.all())
    class Meta:
        model = CourseUser
        exclude = ('course', 'user')
        expandable_fields = {
            'user'    :  'apps.core.rest.UserSerializer',
        }


class CourseChapterSerializer(CoreModelSerializer):
    course_id   = PrimaryKeyRelatedField(source='course', queryset=Course.objects.all())
    class Meta:
        model = CourseChapter
        exclude = ('course', )
        expandable_fields = {
            'course' :  'apps.course.rest.CourseSerializer',
            'lessons': ('apps.course.rest.LessonSerializer', {'many': True}),
        }


class LessonSerializer(CoreModelSerializer):
    chapter_id  = PrimaryKeyRelatedField(source='chapter', queryset=CourseChapter.objects.all())
    class Meta:
        model = Lesson 
        exclude = ('chapter', ) 
        expandable_fields = {
            'chapter':  'apps.course.rest.CourseChapterSerializer',
            'blocks' : ('apps.course.rest.LessonBlockSerializer', {'many': True}),
        }


class LessonBlockSerializer(CoreModelSerializer):
    lesson_id  = PrimaryKeyRelatedField(source='lesson', queryset=Lesson.objects.all())
    file_id   = PrimaryKeyRelatedField(source='file', queryset=File.objects.all())
    class Meta:
        model = LessonBlock
        exclude = ('lesson', 'file')
        expandable_fields = {
            'file':  'apps.files.rest.FileSerializer',
        }


class LessonUserStatusSerializer(CoreModelSerializer):
    lesson_id = PrimaryKeyRelatedField(source='lesson', queryset=Lesson.objects.all())
    user_id   = PrimaryKeyRelatedField(source='user'  , queryset=User.objects.all())
    class Meta:
        model = LessonUserStatus
        exclude = ('lesson', 'user', ) 

