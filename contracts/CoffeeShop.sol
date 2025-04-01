// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

uint256 constant TOTAL_ITEMS = 10;

contract CoffeeShop {
  address public ShopOwner = payable(msg.sender);

  event OrderPlaced(address indexed customer, uint256 indexed itemId);

  struct CoffeeShopMenu {
    uint256 price;
    address owner;
    uint noOfItems;
    string[] menuItems;
    uint256[] menuItemsPrice;
  }

  CoffeeShopMenu[TOTAL_ITEMS] public items;

  // NEW: Order history and ratings
  mapping(address => string[]) public orderHistory;
  mapping(uint256 => uint8[]) public ratings;
  mapping(uint256 => string[]) public feedback;

  constructor() {
    ShopOwner = payable(msg.sender);
    for (uint256 i = 0; i < TOTAL_ITEMS; i++) {
      items[i].price = 1e16; // initial tax of 0.01 ETH
      items[i].owner = address(0x0);
      items[i].noOfItems = 5;

      items[i].menuItems.push("Espresso");
      items[i].menuItemsPrice.push(5 * 1e17);

      items[i].menuItems.push("Cappuccino");
      items[i].menuItemsPrice.push(7 * 1e17);

      items[i].menuItems.push("Latte");
      items[i].menuItemsPrice.push(4 * 1e17);

      items[i].menuItems.push("Mocha");
      items[i].menuItemsPrice.push(3 * 1e17);

      items[i].menuItems.push("Americano");
      items[i].menuItemsPrice.push(8 * 1e17);
    }
  }

  function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
    bytes memory b1 = bytes(s1);
    bytes memory b2 = bytes(s2);
    uint256 l1 = b1.length;
    if (l1 != b2.length) return false;
    for (uint256 i = 0; i < l1; i++) {
      if (b1[i] != b2[i]) return false;
    }
    return true;
  }

  function buyItem(uint256 _index, string memory itemName) external payable {
    require(_index < TOTAL_ITEMS && _index >= 0, "Invalid index");
    require(items[_index].owner == address(0x0), "Item already purchased");

    int f = -1;
    for (uint i = 0; i < items[_index].noOfItems; i++) {
      if (stringsEquals(itemName, items[_index].menuItems[i])) {
        f = int(i);
      }
    }
    require(f != -1, "Item not found in menu");

    require(
      msg.value >= (items[_index].price + items[_index].menuItemsPrice[uint(f)]),
      "Insufficient payment"
    );

    items[_index].owner = msg.sender;
    orderHistory[msg.sender].push(itemName);
    emit OrderPlaced(msg.sender, _index);
  }

  function rateItem(uint256 itemId, uint8 stars, string memory comment) external {
    require(itemId < TOTAL_ITEMS, "Invalid item ID");
    require(stars >= 1 && stars <= 5, "Rating must be 1 to 5");

    ratings[itemId].push(stars);
    feedback[itemId].push(comment);
  }

  function withdrawMoney() public {
    require(msg.sender == ShopOwner, "Only shop owner can withdraw");
    payable(ShopOwner).transfer(address(this).balance);
  }
}
