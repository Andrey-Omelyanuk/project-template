import pytz
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from datetime import datetime
from urllib.parse import urlparse
from .items import Article 


class Spider(CrawlSpider):
    name = 'onlinebrest.by'
    allowed_domains = [        'onlinebrest.by']
    start_urls      = ['https://onlinebrest.by/']
    base_url        =  'https://onlinebrest.by/'
    rules = (
        Rule(LinkExtractor(allow='novosti/'), 'parse', follow=True),
    )

    def parse(self, response):
        timestamp = datetime.utcnow()
        timestamp = timestamp.replace(tzinfo=pytz.utc)
       
        time = response.css('div.single-news__date span::text')[2].extract()
        date_time_obj = datetime.strptime(time, '%d.%m.%Y %H:%M').isoformat()

        article = Article()
        article['url']          = response.url
        article['idx']          = urlparse(response.url).path
        article['timestamp']    = timestamp.isoformat()
        article['title']        = response.css('div.single-news-title h1::text').get()
        article['body'] 	= response.css('div.news-single-content p::text').extract() 
        article['publish_date'] = date_time_obj

        return article
