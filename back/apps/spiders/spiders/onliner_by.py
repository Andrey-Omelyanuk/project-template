import pytz
from scrapy.spiders        import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from django.conf           import settings
from django.utils          import timezone
from datetime              import datetime
from urllib.parse           import urlparse
from .items import Article 


class Spider(CrawlSpider):
    name            = "onliner.by"
    allowed_domains = ["onliner.by"]
    start_urls      = ['https://onliner.by/']
    rules = (
        Rule(LinkExtractor(allow=[r'(https:\/\/people\.onliner\.by\S*)$']), 'parse', follow=False),
    )

    def parse(self, response):
        timestamp = datetime.utcnow()
        timestamp = timestamp.replace(tzinfo=pytz.utc)

        article = Article()
        article['url']          = response.url
        article['idx']          = urlparse(response.url).path
        article['timestamp']    = timestamp.isoformat()
        article['title']        = response.css('.title h1::text').get()
        article['body']         = response.css('.shareText::text').get()
        article['publish_date'] = response.css('.shareText_publish::text').get()

        return article 
        # yield {
        #     'url'           : response.url, 
        #     'idx'           : response.css('.news-container::attr(data-io-article-url)').extract_first(),
        #     'timestamp'     : timestamp.isoformat(),
        #     'title'         : response.css('.news-header__title::text)').extract_first(),
        #     'body'          : response.css('.news-text::text)').extract_first(),
        #     'publish_date'  : response.css('.news-header__time::text)').extract_first(),
        # }
