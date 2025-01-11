from .views import *


def course(router):
    router.register(r'course', CourseViewSet, basename="course")
    router.register(r'course-user', CourseUserViewSet, basename="course_user")
    router.register(r'course-chapter', CourseChapterViewSet, basename="course_chapter")
    router.register(r'lesson', LessonViewSet, basename="lesson")
    router.register(r'lesson-block', LessonBlockViewSet, basename="lesson_block")
    router.register(r'lesson-user-status', LessonUserStatusViewSet, basename="lesson_user_status")
