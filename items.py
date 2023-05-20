# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ScrapeCreditCardsItem(scrapy.Item):
    # define the fields for your item here like:
    card_name = scrapy.Field()
    card_fee = scrapy.Field()
    rewards = scrapy.Field()
    lounge_access = scrapy.Field()
    milestone_benefits = scrapy.Field()
    card_fee_reversal = scrapy.Field()
    
