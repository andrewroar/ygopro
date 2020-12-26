YGOPRO Database

# Description

This is a website which utilitise the YGOPRO api to allow user to search for their yu-gi-oh card.

This website also have a community section where you can share your custome card and have it voted .

# User Story

While there are APPs which allows you to search for a yu-gi-oh card with ease, there are not too many website for it as majority of these website can be quite incovience to use. I wish to design a website where as soon as you enter the site, you can search for your card.

The Custome Card feature is just a for-fun function as I found that people do enjoy designing their own cards

# Implimentation

## Homepage

For the database, I used the API from YGOPRO which itself is an API maintained by a group of dedicated people who also love the card game.
(https://db.ygoprodeck.com/api/v7/cardinfo.php)

When the page is first loaded, the website will fetch all the card in the data base. The filter function utiliise both the filter from the API and my own filter. It can filter card type ("Monster, Spell,Trap") and sub-type of the card ("Pendulum Monster, Equip Spell, Counter-Trap" etc) but I will need to put alot more layers of filter in the search bar.

My filter depends on the state of React and use .filter() according to the state. Once the data is filtered, it will be render to the <HOME> where the card will be generated.

## Card

Not too much to explain in here. It is generated using the object from the JSON file fetched from the API. The ebay search list is something I added on it for easier price searching.

## Custom Card

Custom Card is stored and processed in my custom API.

There are five route in my API:

get "/customcards" : To get all custom card. The data will be use the render the custom card page.

get "/customcards/:id" : Search one card by its ID. Legacy function and do not do anything in this page. But might be useful in the future.

post "/customcards" : Adding the custom card to the database

Delete "/customcards/:id" : Delete the custom card from the database. A password, which is hased, will be required to do so. In the future, the prompt for password will be replaced by a diaglue box for better security

Vote "/customcards/vote/:id" : To vote for a card

# CSS

I base the design of the webpage on Yu-gi-oh Card

The Navigation bar used green to refer to the spell card

The search bar and form used pink to refer to the trap card

The search bar and form used pink to refer to the trap card

# Bugfix

-Fixed a bug where switching between filter to lead to no result

-Fixed a bug where the site will crash when loading card which has not been released yet. The object will not have "card_sets" if the card has been to be released in the TCG which resulted in the site crashing

-Path was not working properly when deployed

# Future Road Map

-Adding Ban list to the website

-Replace prompt with Dialog box

-Increase filters

-Add function to prevent DDOS 

-Adding censorship to custom card to censor words like sh\*t and f\*ck
from card name and description
