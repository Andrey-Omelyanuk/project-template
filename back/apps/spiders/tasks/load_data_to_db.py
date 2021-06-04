import os
import json
import dateutil.parser
from urllib.parse   import urlparse
from datetime       import datetime
from celery         import shared_task
from django.conf    import settings
from django.utils.timezone import utc


@shared_task
def load_data_to_db(paren_result, session_id):
    from ..models import Site, Page, Article, ArticleSnapshot, Session
    session = Session.objects.get(id=session_id)
    session.load_started = datetime.utcnow().replace(tzinfo=utc)
    session.save()

    site = None
    feed_file = os.path.join(settings.DATA_DIR, f"{session_id}.json")
    with open(feed_file) as file:
        for line in file:
            row = json.loads(line)
            # convert some data to pythonic
            timestamp   = dateutil.parser.parse(row['timestamp'])
            url         = urlparse(row['url'])
            try:
                publish_date = dateutil.parser.parse(row['publish_date'])
            except Exception:
                publish_date = None 

            # site
            if not site or site.url == url.netloc:
                site, created = Site.objects.get_or_create(url=url.netloc)
            # page 
            try:                        
                page = Page.objects.get(site=site, url=url.path)
                if page.last_visit < timestamp:
                    page.last_visit = timestamp 
                    page.save()
            except Page.DoesNotExist:
                page = Page(site=site, url=url.path, last_visit=timestamp)
                page.save()
            # article
            try:
                article = Article.objects.get(site=site, idx=row['idx'])
                # TODO: update the article
                if article.last_updated < timestamp:
                    article.last_updated = timestamp 
                    article.save()
            except Article.DoesNotExist:
                article = Article(  site          = site, 
                                    idx           = row['idx'], 
                                    last_updated  = timestamp, 
                                    title         = row['title'],
                                    body          = row['body'],
                                    publish_date  = publish_date)
                article.save()
            # article snapshot
            snapshot = ArticleSnapshot( session     = session, 
                                        page        = page, 
                                        article     = article, 
                                        timestamp   = timestamp, 
                                        title         = row['title'],
                                        body          = row['body'],
                                        publish_date  = publish_date)
            try:
                snapshot.save()
            except Exception:
                # TODO: is bad, ignore now
                pass 

    session.load_finished = datetime.utcnow().replace(tzinfo=utc)
    session.save()
