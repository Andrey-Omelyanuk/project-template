from apps.spiders.models import Article 
from django.db.models import Model, CASCADE, ForeignKey, CharField, TextField, DateTimeField, BooleanField, IntegerField
from django.db.models.signals import post_save
from django.dispatch import receiver
from .tasks.run_analyzer import run_analyzer 


class Analyzer(Model):
    name        = CharField(max_length=128, unique=True,   help_text='use analyzer from apps/analyzers/analyzers/<name>.py')
    desc        = TextField(default='')

    def __str__(self):
        return f"{self.name}"


class AnalyzerSession(Model):
    analyzer    = ForeignKey    (Analyzer, on_delete=CASCADE)
    started     = DateTimeField (auto_now_add=True) # TODO: set started when long task started from worker
    finished    = DateTimeField (blank=True, null=True)

    def __str__(self):
        return f"{self.analyzer.name} {self.started} - {self.finished}"

@receiver(post_save, sender=AnalyzerSession)
def run_analyzer_if_session_was_created(sender, instance, created, **kwargs):
    if (created):
        run_analyzer.delay(instance.id)


class Tag(Model):
    title = CharField(max_length=128, unique=True, help_text='')
    desc  = TextField(default='')

    def __str__(self):
        return f"{self.title}"


class TagHistory(Model):
    article     = ForeignKey(Article, on_delete=CASCADE)
    tag         = ForeignKey(Tag    , on_delete=CASCADE)
    count       = IntegerField()

    def __str__(self):
        return f"{self.tag.title} {self.article.id} {self.count}"

    class Meta:
        unique_together = (("article", "tag"),)
