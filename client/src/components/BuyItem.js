import React, { useState } from "react";

const menu = [
  { id: 0, name: "Espresso", price: 5 },
  { id: 1, name: "Cappuccino", price: 7 },
  { id: 2, name: "Latte", price: 4 },
  { id: 3, name: "Mocha", price: 3 },
  { id: 4, name: "Americano", price: 8 },
];

export default function BuyItem({ account, contract, web3 }) {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  const buy = async () => {
    if (selected === null) return;
    try {
      const tax = web3.utils.toWei("0.01", "ether");
      const itemPrice = web3.utils.toWei(menu[selected].price.toString(), "ether");
      const total = web3.utils.toBN(tax).add(web3.utils.toBN(itemPrice));

      await contract.methods
        .buyItem(selected, menu[selected].name)
        .send({ from: account, value: total });

      setMessage(`You bought ${menu[selected].name}!`);
    } catch (err) {
      console.error(err);
      setMessage("Transaction failed.");
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">Buy Coffee</h2>
      <select
        className="border p-2 rounded mb-2"
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Select a drink</option>
        {menu.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} - {item.price} ETH
          </option>
        ))}
      </select>
      <button
        onClick={buy}
        className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Buy
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
