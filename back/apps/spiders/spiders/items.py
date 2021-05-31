import scrapy


class Article(scrapy.Item):
    # define the fields for your item here like:
    url         = scrapy.Field()
    idx         = scrapy.Field()
    timestamp   = scrapy.Field()
    title       = scrapy.Field()
    body        = scrapy.Field()
    publish_date= scrapy.Field()
