from django.contrib.auth import get_user_model
from django.db.models import CASCADE, CharField, DateTimeField, \
    FileField, ForeignKey, IntegerChoices, Model, PositiveSmallIntegerField
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_minio_backend import MinioBackend
User = get_user_model()


__all__ = [
    'File',
    'FileVersion',
]


class File(Model):
    """ This model store original files. """

    class Type(IntegerChoices):
        """ File type. """
        UNKNOWN = 0, _('Unknown')
        IMAGE   = 1, _('Image')
        AUDIO   = 2, _('Audio')
        VIDEO   = 3, _('Video')

    uploaded_by = ForeignKey(User, on_delete=CASCADE)
    uploaded_at = DateTimeField(auto_now_add=True)
    type        = PositiveSmallIntegerField(choices=Type.choices, default=Type.UNKNOWN)
    file        = FileField(storage=MinioBackend(bucket_name='main'),
                            upload_to='original_files/')
    original    = CharField(max_length=256, null=True, blank=True, help_text='Original file name.')

    def save(self, *args, **kwargs):
        # """ Save original file name and rename file to id. """
        # if not self.file.name:
        #     self.original = self.file.name
        #     self.file.name = f"{self.id}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.id} {self.file}"

@receiver(post_save, sender=File)
def process_video(sender, instance, **kwargs):
    """ When file is uploaded, process it. """
    from .tasks.video import process_video_task
    if instance.type == File.Type.VIDEO:
        process_video_task.delay(instance.id, '720p')
        process_video_task.delay(instance.id, '1080p')


class FileVersion(Model):
    """ Video, audio and image can be recompressed. 
        Original file stay in the File model but here we store derivative.
    """
    original = ForeignKey(File, on_delete=CASCADE, related_name='versions')
    slug     = CharField(max_length=64, null=True, blank=True, help_text='What version it is.')
    file     = FileField(storage=MinioBackend(bucket_name='main'),
                         upload_to='version_files/')

    class Meta:
        unique_together = (('original', 'slug'), )

    def __str__(self):
        return f"{self.id} {self.slug} {self.file}"
