BOT_NAME = "scrape_credit_cards"
SPIDER_MODULES = ["scrape_credit_cards.spiders"]
NEWSPIDER_MODULE = "scrape_credit_cards.spiders"
ROBOTSTXT_OBEY = True
DOWNLOADER_MIDDLEWARES = {
    'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': None,
    'scrapy_user_agents.middlewares.RandomUserAgentMiddleware': 400,
}
ITEM_PIPELINES = {
   "scrape_credit_cards.pipelines.ScrapeCreditCardsPipeline": 300,
}
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
FEED_EXPORT_ENCODING = "utf-8"
