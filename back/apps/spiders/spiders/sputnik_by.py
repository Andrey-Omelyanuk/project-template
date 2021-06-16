import pytz
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from datetime import datetime
from urllib.parse import urlparse
from .items import Article


class Spider(CrawlSpider):
    name = 'sputnik.by'
    allowed_domains = ['sputnik.by']
    start_urls = ['https://sputnik.by/']
    base_url = 'https://sputnik.by/'
    rules = (
        Rule(LinkExtractor(
            allow=[
             r'https:\/\/sputnik.by\/politics\/\S+']),
             'parse', follow=True),
    )

    def parse(self, response):
        timestamp = datetime.utcnow()
        timestamp = timestamp.replace(tzinfo=pytz.utc)
        #print (type(timestamp))//str
        time = response.css(
           'time.b-article__refs-date::text')[0].extract()
        #print (type(time))str
        date_time_obj = datetime.strptime(
            time, '%H:%M %d.%m.%Y').isoformat()
        
        article = Article()
        article['url'] = response.url
        article['idx'] = urlparse(response.url).path
        article['timestamp'] = timestamp.isoformat()
        article['title'] = response.css(
            'div.b-article__header-title h1::text').get()
        article['body'] = response.css(
            'div.b-article__text p::text').extract()
        article['publish_date'] = date_time_obj

        return article
