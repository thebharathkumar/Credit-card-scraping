import scrapy
from scrape_credit_cards.items import ScrapeCreditCardsItem



class CardNameSpider(scrapy.Spider):
    name='Cardname'
    start_urls = ['https://www.hdfcbank.com/personal/pay/cards/credit-cards']

    def parse(self, response):
        items = ScrapeCreditCardsItem()
        card_name = response.css('.card-name::text').extract()
        rewards = response.css('.mB10 ul').css('::text').extract()

        items['card_name'] = card_name
        items['rewards'] = rewards
        yield items