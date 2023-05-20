import scrapy
from scrape_credit_cards.items import ScrapeCreditCardsItem

import pandas as pd


class ScrapeFeeCharges(scrapy.Spider):
    name='FeeAndCharge'
    card_names = ['moneyback-plus', 'indianoil-hdfc-bank-credit-card', 'credit-cards/regalia-gold-credit-card']
    start_urls = [f'https://www.hdfcbank.com/personal/pay/cards/credit-cards/{name}/fees-and-charges' for name in card_names]

    def parse(self, response):
        items = ScrapeCreditCardsItem()
        card_fee = response.css('.right-section').css('::text').extract()

        items['card_fee'] = card_fee
        yield items

    # def closed(self, reason):
    #     items = [item for item in self.crawler.stats.get_stats() if isinstance(item, ScrapeCreditCardsItem)]
    #     df = pd.DataFrame(items)
    #     df.to_excel('credit_card_fees.xlsx', index=False)