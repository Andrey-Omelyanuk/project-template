from apps.core.rest.views import CoreModelViewSet
from ..models import *
from .serializers import *


__all__ = [
    'CourseViewSet',
    'CourseUserViewSet',
    'CourseChapterViewSet',
    'LessonViewSet',
    'LessonBlockViewSet',
    'LessonUserStatusViewSet',
]


class CourseViewSet(CoreModelViewSet):
    serializer_class = CourseSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Course.objects.all()
        elif self.request.user:
            return Course.objects.all(users__user=self.request.user)
        else:
            return None


class CourseUserViewSet(CoreModelViewSet):
    serializer_class = CourseUserSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return CourseUser.objects.all()
        elif self.request.user:
            return CourseUser.objects.all(user=self.request.user)
        else:
            return None


class CourseChapterViewSet(CoreModelViewSet):
    serializer_class = CourseChapterSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return CourseChapter.objects.all()
        elif self.request.user:
            return CourseChapter.objects.all(course__users__user=self.request.user)
        else:
            return None


class LessonViewSet(CoreModelViewSet):
    serializer_class = LessonSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Lesson.objects.all()
        elif self.request.user:
            return Lesson.objects.all(chapter__course__users__user=self.request.user)
        else:
            return None


class LessonBlockViewSet(CoreModelViewSet):
    serializer_class = LessonBlockSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return LessonBlock.objects.all()
        elif self.request.user:
            return LessonBlock.objects.all(lesson__chapter__course__users__user=self.request.user)
        else:
            return None


class LessonUserStatusViewSet(CoreModelViewSet):
    serializer_class = LessonUserStatusSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return LessonUserStatus.objects.all()
        elif self.request.user:
            return LessonUserStatus.objects.all(user=self.request.user)
        else:
            return None
