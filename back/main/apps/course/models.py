from django.contrib.auth import get_user_model
from django.db.models import CASCADE, DO_NOTHING, BooleanField, CharField, DateTimeField, \
    ForeignKey, IntegerChoices, Model, PositiveSmallIntegerField, TextField
from django.utils.translation import gettext_lazy as _
from simple_history.models import HistoricalRecords
from apps.files.models import File
User = get_user_model()


__all__ = [
    'Course',
    'CourseUser',
    'CourseChapter',
    'Lesson',
    'LessonBlock',
    'LessonUserStatus',
]


class Course(Model):
    is_active   = BooleanField(default=True)
    title       = CharField(max_length=512)
    desc        = TextField()
    # lang
    # img

    history = HistoricalRecords()

    def __str__(self):
        return f"{self.id} {self.title}"


class CourseUser(Model):
    """ All users (students, teachers, admins, etc.) in the course."""
    course      = ForeignKey(Course, on_delete=CASCADE, related_name='users')
    user        = ForeignKey(User  , on_delete=CASCADE)
    # user can have all roles in the same time 
    is_student  = BooleanField(default=False)
    is_teacher  = BooleanField(default=False)
    is_admin    = BooleanField(default=False)

    history = HistoricalRecords()

    class Meta:
        unique_together = (('course', 'user'), )

    def __str__(self):
        return f"{self.course} {self.user}"


class CourseChapter(Model):
    course  = ForeignKey(Course, on_delete=CASCADE, related_name='chapters')
    index   = PositiveSmallIntegerField()
    title   = CharField(max_length=512)
    desc    = TextField()
    # img

    history = HistoricalRecords()

    class Meta:
        unique_together = (('course', 'index'), )

    def __str__(self):
        return f"{self.id} {self.title}"


class Lesson(Model):
    chapter     = ForeignKey(CourseChapter, on_delete=CASCADE, related_name='lessons')
    index       = PositiveSmallIntegerField()
    title       = CharField(max_length=512)
    desc        = TextField()
    # img

    history = HistoricalRecords()

    class Meta:
        unique_together = (('chapter', 'index'), )

    def __str__(self):
        return f"{self.id} {self.title}"


class LessonBlock(Model):
    """ Block of lesson. Can be text, image, audio or video. """

    class Type(IntegerChoices):
        """ Block type. """
        TEXT = 1, _('Text')
        IMAGE= 2, _('Image')
        AUDIO= 3, _('Audio')
        VIDEO= 4, _('Video')

    lesson      = ForeignKey(Lesson, on_delete=CASCADE, related_name='blocks')
    index       = PositiveSmallIntegerField()
    type        = PositiveSmallIntegerField(choices=Type.choices, default=Type.TEXT)
    title       = CharField(max_length=512, null=True, blank=True)
    text        = TextField(null=True, blank=True)
    file        = ForeignKey(File, on_delete=DO_NOTHING, null=True, blank=True)

    history = HistoricalRecords()

    class Meta:
        unique_together = (('lesson', 'index'), )

    def __str__(self):
        return f"{self.lesson} = {self.id} {self.title}"


class LessonUserStatus(Model):
    """ Aggrigation of LessonUserEvent """
    lesson      = ForeignKey(Lesson, on_delete=CASCADE)
    user        = ForeignKey(User  , on_delete=CASCADE)
    finished_at = DateTimeField(null=True, blank=True)
    # can be extended in future, for example approved_by some teacher or grade

    history = HistoricalRecords()

    class Meta:
        unique_together = (('lesson', 'user'), )
