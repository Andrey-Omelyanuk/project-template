from celery import chain
from django.db.models import Model, CASCADE, ForeignKey, CharField, TextField, DateTimeField, BooleanField, IntegerField, JSONField
from django.db.models.signals import post_save
from django.dispatch import receiver
from .tasks.run_spider import run_spider 
from .tasks.load_data_to_db import load_data_to_db 


class Spider(Model):
    name        = CharField     (max_length=128, unique=True,   help_text='use spider from apps/spiders/spiders/<name>.py')
    desc        = TextField     (default='')

    def __str__(self):
        return f"{self.name}"


class Session(Model):
    spider      = ForeignKey    (Spider, on_delete=CASCADE)
    started     = DateTimeField (auto_now_add=True)
    finished    = DateTimeField (blank=True, null=True)
    load_started  = DateTimeField (blank=True, null=True)
    load_finished = DateTimeField (blank=True, null=True)

    def __str__(self):
        return f"{self.spider.name} {self.started} - {self.finished}"

@receiver(post_save, sender=Session)
def run_spider_if_session_was_created(sender, instance, created, **kwargs):
    if (created):
        run_spider.delay(instance.id)
        # run_spider.apply_async(instance.id, link=load_data_to_db.s(instance.id))
        (run_spider.s(instance.id) | load_data_to_db.s(instance.id)).apply_async()


class Site(Model):
    url         = CharField     (max_length=256, unique=True)
    desc        = TextField     (default='')

    def __str__(self):
        return self.url 


class Page(Model):
    site        = ForeignKey    (Site, on_delete=CASCADE)
    url         = CharField     (max_length=512, unique=True,   help_text='Url without domain. You can find domain in site.url .')
    last_visit  = DateTimeField (                               help_text='When spider was on the page in last time.')

    def __str__(self):
        return "%s%s"%(self.site.url, self.url)


class Article(Model):
    site        = ForeignKey    (Site, on_delete=CASCADE)
    idx         = CharField     (max_length=256, help_text='ID or Slug.')
    last_updated= DateTimeField (help_text='Datetime from ArticleSnapshot.timestamp')
    title       = TextField     (help_text='Title.')
    body        = TextField     (help_text='Main text of article')
    publish_date= DateTimeField (blank=True, null=True, help_text='')

    class Meta:
        unique_together = (("site", "idx"),)


class ArticleSnapshot(Model):
    session     = ForeignKey    (Session, on_delete=CASCADE)
    page        = ForeignKey    (Page   , on_delete=CASCADE)
    article     = ForeignKey    (Article, on_delete=CASCADE)
    timestamp   = DateTimeField (                   help_text='Datetime when data was read from page.')
    title       = CharField     (default='', blank=True, max_length=256, help_text='Title.')
    body        = JSONField     (default=dict,      help_text='Desc  that was scriped from page.')
    publish_date= DateTimeField (blank=True, null=True, help_text='')

    class Meta:
        unique_together = (("session", "page", "article"),)
