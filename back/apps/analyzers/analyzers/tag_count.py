from apps.spiders.models import Article
from ..models import Tag, TagHistory


# TODO: optimize - don't analyze articles that was analyzed before
def analyzer():
    for tag in Tag.objects.all():
        for article in Article.objects.all():
            history, created = TagHistory.objects.get_or_create(article=article, tag=tag, defaults={'count': 0})
            history.count = article.body.count(tag.title)
            history.save()
