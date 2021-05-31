import pytz
from scrapy.spiders         import CrawlSpider, Rule
from scrapy.linkextractors  import LinkExtractor
from datetime               import datetime
from urllib.parse           import urlparse
from .items import Article 



class Spider(CrawlSpider):
    name = "zarya.by"
    allowed_domains = ["zarya.by"]
    start_urls = [ "https://zarya.by/category/news/" ]
    rules = (
      Rule(LinkExtractor(allow=[r'https:\/\/zarya.by\/news\/lenta-novostej\/\S+'], restrict_css=['.newsFeedList', ]), 'parse'),
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
