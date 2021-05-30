import pytz
from scrapy.spiders         import CrawlSpider, Rule
from scrapy.linkextractors  import LinkExtractor
from django.conf            import settings
from django.utils           import timezone
from datetime               import datetime
from urllib.parse           import urlparse


class Spider(CrawlSpider):
    name            = "telegraf.by"
    allowed_domains = ["telegraf.by"]
    start_urls      = ['https://telegraf.by/politika/']
    rules = (
        Rule(LinkExtractor(allow=[r'(\/politika\/S*)$']), 'parse', follow=False),
    )

    def parse(self, response):
        timestamp = datetime.utcnow()
        timestamp = timestamp.replace(tzinfo=pytz.utc)

        yield {
            'url'           : response.url, 
            'idx'           : urlparse(response.url).path, 
            'timestamp'     : timestamp.isoformat(),
            'title'         : response.css('.zagolovok::text').get(),
            'body'          : response.css('.text-posta::text').get(),
            'publish_date'  : response.xpath('//*[@id="primary"]/div[1]/div/div/text()').get(),
        }
