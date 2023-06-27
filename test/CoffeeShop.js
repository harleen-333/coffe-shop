const CoffeeShop = artifacts.require('CoffeeShop');
const assert = require('assert');

contract('CoffeeShop', (accounts) => {
  
  it('should allower a user to buy an item', async () => {
    const BUYER = accounts[1];
    const ITEM_ID = 0;
    const ITEM_ORDERED = "Espresso";
    const instance = await CoffeeShop.deployed();
    const originalItem = await instance.items(
      ITEM_ID
    );
    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16+5*1e17),
    });
    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(
      updatedItem.owner,
      BUYER,
      'the buyer should now own this item'
    );
  });
  it('should allower a user to buy an item', async () => {
    const BUYER = accounts[2];
    const ITEM_ID = 1;
    const ITEM_ORDERED = "Cappuccino";
    const instance = await CoffeeShop.deployed();
    const originalItem = await instance.items(
      ITEM_ID
    );
    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16+7*1e17),
    });
    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(
      updatedItem.owner,
      BUYER,
      'the buyer should now own this item'
    );
  });
  it('should allower a user to buy an item', async () => {
    const BUYER = accounts[3];
    const ITEM_ID = 2;
    const ITEM_ORDERED = "Latte";
    const instance = await CoffeeShop.deployed();
    const originalItem = await instance.items(
      ITEM_ID
    );
    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16+4*1e17),
    });
    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(
      updatedItem.owner,
      BUYER,
      'the buyer should now own this item'
    );
  });
  it('should allower a user to buy an item', async () => {
    const BUYER = accounts[4];
    const ITEM_ID = 3;
    const ITEM_ORDERED = "Mocha";
    const instance = await CoffeeShop.deployed();
    const originalItem = await instance.items(
      ITEM_ID
    );
    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16+3*1e17),
    });
    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(
      updatedItem.owner,
      BUYER,
      'the buyer should now own this item'
    );
  });
  it('should allower a user to buy an item', async () => {
    const BUYER = accounts[5];
    const ITEM_ID = 4;
    const ITEM_ORDERED = "Americano";
    const instance = await CoffeeShop.deployed();
    const originalItem = await instance.items(
      ITEM_ID
    );
    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16+6*1e17),
    });
    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(
      updatedItem.owner,
      BUYER,
      'the buyer should now own this item'
    );
  });
  it('should allower a user to buy an item2', async () => {
    const BUYER = accounts[5];
    const ITEM_ID = 4;
    const ITEM_ORDERED = "Americano";
    const instance = await CoffeeShop.deployed();
    const originalItem = await instance.items(
      ITEM_ID
    );
    await instance.buyItem(ITEM_ID, ITEM_ORDERED, {
      from: BUYER,
      value: (1e16+8*1e17),
    });
    const updatedItem = await instance.items(ITEM_ID);
    assert.equal(
      updatedItem.owner,
      BUYER,
      'the buyer should now own this item'
    );
  });
  it('withdrawing money', async () => {
    const BUYER = accounts[6];
    // const ITEM_ID = 4;
    // const ITEM_ORDERED = "Americano";
    const instance = await CoffeeShop.deployed();
    // const originalItem = await instance.items(
    //   ITEM_ID
    // );
    await instance.withdrawMoney({ from: BUYER });
    // const updatedItem = await instance.items(ITEM_ID);
    // assert.equal(
    //   updatedItem.owner,
    //   BUYER,
    //   'the buyer should now own this item'
    // );
  });
});
