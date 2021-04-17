from django.db.models import Model, CASCADE, ForeignKey, CharField, TextField, DateTimeField, BooleanField, IntegerField
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.postgres.fields import JSONField
from .tasks.run_spider import run_spider 


class Spider(Model):
    name        = CharField     (max_length=128, unique=True,   help_text='use spider from apps/spiders/spiders/<name>.py')
    desc        = TextField     (default='')

    def __str__(self):
        return f"{self.name}"


class Session(Model):
    spider      = ForeignKey    (Spider, on_delete=CASCADE)
    started     = DateTimeField (auto_now_add=True)
    finished    = DateTimeField (blank=True, null=True)

    def __str__(self):
        return f"{self.spider.name} {self.started} - {self.finished}"

@receiver(post_save, sender=Session)
def run_spider_if_session_was_created(sender, instance, created, **kwargs):
    if (created):
        run_spider.delay(instance.id)
