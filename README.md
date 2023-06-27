# coffe-shop
Dapp for Coffe Shop using Ethereum

Idea:- In this ever-evolving world blockchain technology has become the new
normal. Coffee which is a basic need nowadays has been far from being touched by
blockchain technology or technology in general hence I thought of building a dapp for
a coffe shop. This will promote transparency , trust and fair prices among the
consumers.

Extra Libraries and Tools used:-
Used truffle suite for project creation and providing with the basic code for network
management etc.
Used Ganache for testing on a local blockchain.
Metamask can be used for frontend collaboration of web3 app.

Implementation:- I used Ethereum blockchain using ganache and
used Metamask wallet for interfacing with Web3 application. Wrote a
smart contract for the shop and then wrote local test files to check its
implementation.

Coffeshop.sol :-
CoffeShopMenu structure is defined containing tax prices, owner address,
no of items ordered, menu items and their price.
stringsEquals function is used to compare the the order given by the buyer and the
contents of the menu chart. Return type is boolean.
buyItem function has payable keyword to check that the owner account is payable. It
checks for the item ordered by the customer using stringEquals and also checks the
amount paid by the buyer is equal to the cost of those items.
