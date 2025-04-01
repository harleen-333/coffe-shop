const CoffeeShop = artifacts.require('CoffeeShop');
const assert = require('assert');
const { expectRevert } = require('@openzeppelin/test-helpers');

contract('CoffeeShop', (accounts) => {

  it('should allow a user to buy Espresso', async () => {
    const instance = await CoffeeShop.deployed();
    const BUYER = accounts[1];
    const ITEM_ID = 0;
    const ITEM_ORDERED = "Espresso";

    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16 + 5 * 1e17),
    });

    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(updatedItem.owner, BUYER, 'The buyer should now own this item');
  });

  it('should allow a user to buy Cappuccino', async () => {
    const instance = await CoffeeShop.deployed();
    const BUYER = accounts[2];
    const ITEM_ID = 1;
    const ITEM_ORDERED = "Cappuccino";

    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16 + 7 * 1e17),
    });

    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(updatedItem.owner, BUYER, 'The buyer should now own this item');
  });

  it('should allow a user to buy Latte', async () => {
    const instance = await CoffeeShop.deployed();
    const BUYER = accounts[3];
    const ITEM_ID = 2;
    const ITEM_ORDERED = "Latte";

    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16 + 4 * 1e17),
    });

    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(updatedItem.owner, BUYER, 'The buyer should now own this item');
  });

  it('should allow a user to buy Mocha', async () => {
    const instance = await CoffeeShop.deployed();
    const BUYER = accounts[4];
    const ITEM_ID = 3;
    const ITEM_ORDERED = "Mocha";

    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16 + 3 * 1e17),
    });

    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(updatedItem.owner, BUYER, 'The buyer should now own this item');
  });

  it('should allow first purchase and reject duplicate purchase of Americano', async () => {
    const instance = await CoffeeShop.deployed();
    const BUYER1 = accounts[5];
    const BUYER2 = accounts[6];
    const ITEM_ID = 4;
    const ITEM_ORDERED = "Americano";

    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER1,
      value: (1e16 + 8 * 1e17),
    });

    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(updatedItem.owner, BUYER1, 'The buyer should now own this item');

    await expectRevert(
      instance.buyItem(ITEM_ID, ITEM_ORDERED, {
        from: BUYER2,
        value: (1e16 + 8 * 1e17),
      }),
      "Item already purchased"
    );
  });

  it('should allow the owner to withdraw funds', async () => {
    const instance = await CoffeeShop.deployed();
    const OWNER = accounts[0];

    await instance.withdrawMoney({ from: OWNER });
  });

  it('should track order history for a user', async () => {
    const instance = await CoffeeShop.deployed();
    const BUYER = accounts[7];
    const ITEM_ID = 5;
    const ITEM_ORDERED = "Espresso";

    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16 + 5 * 1e17),
    });

    const item = await instance.orderHistory(BUYER, 0);
    assert.equal(item, ITEM_ORDERED, "Order should match item name");
  });

  it('should allow a user to rate an item and leave feedback', async () => {
    const instance = await CoffeeShop.deployed();
    const RATER = accounts[8];
    const ITEM_ID = 6;

    await instance.buyItem(ITEM_ID, "Latte", {
      from: RATER,
      value: (1e16 + 4 * 1e17),
    });

    await instance.rateItem(ITEM_ID, 5, "Delicious and strong");

    const rating = await instance.ratings(ITEM_ID, 0);
    const comment = await instance.feedback(ITEM_ID, 0);

    assert.equal(rating.toNumber(), 5, "Rating should be 5 stars");
    assert.equal(comment, "Delicious and strong", "Feedback should match comment");
  });

});
