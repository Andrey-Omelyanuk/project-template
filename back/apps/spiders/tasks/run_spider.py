import logging
import os
from datetime       import datetime
from celery         import shared_task
from scrapy.crawler import CrawlerProcess
from django.conf    import settings
from django.utils.timezone import utc


@shared_task
def run_spider(session_id):
    from ..models import Spider, Session
    session = Session.objects.get(id=session_id)
    spider  = Spider .objects.get(id=session.spider_id)

    # import time
    # time.sleep(20)
    feed_file = os.path.join(settings.DATA_DIR, f"{session.id}.json")
    log_file  = os.path.join(settings.DATA_DIR, f"{session.id}.log" )
    process = CrawlerProcess({
        'FEED_URI'      : 'file://'+feed_file,
        'FEED_FORMAT'   : 'jsonlines',

        'LOG_ENABLE'    : True,
        'LOG_FILE'      : log_file,
        'LOG_LEVEL'     : logging.INFO,
        'LOG_FORMAT'    : '%(levelname)s: %(message)s',
    })
    spider_class  = getattr(__import__(f"apps.spiders.spiders.{spider.name}", fromlist=['Spider']), 'Spider')
    process.crawl(spider_class)
    process.stop()
    process.start()

    session.finished = datetime.utcnow().replace(tzinfo=utc)
    session.save()
