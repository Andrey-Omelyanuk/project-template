import logging
import os
from datetime       import datetime
from celery         import shared_task
from scrapy.crawler import CrawlerProcess
from django.conf    import settings
from django.utils.timezone import utc
from .load_data_to_db import load_data_to_db 


@shared_task
def run_spider(session_id):
    from ..models import Spider, Session
    session = Session.objects.get(id=session_id)
    spider  = Spider .objects.get(id=session.spider_id)
    feed_file = os.path.join(settings.DATA_DIR, f"{session.id}.json")
    log_file  = os.path.join(settings.DATA_DIR, f"{session.id}.log" )

    process = CrawlerProcess(settings={
        'FEEDS': {
            feed_file: {
                'format': 'jsonlines'
            }
        },
        'LOG_FILE'      : log_file,
        'LOG_LEVEL'     : logging.DEBUG,
        'CLOSESPIDER_PAGECOUNT': 20, # limit for dev 
        'DOWNLOAD_DELAY': 1 # 1 sec
    })
    spider_class  = getattr(__import__(f"apps.spiders.spiders.{spider.name}", fromlist=['Spider']), 'Spider')
    process.crawl(spider_class)

    try:
        process.start()
        session.finished = datetime.utcnow().replace(tzinfo=utc)
        session.save()
    except Exception:
        pass
    finally:
        process.stop()
    # load_data_to_db.delay(session_id)
