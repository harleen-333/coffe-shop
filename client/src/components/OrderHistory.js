import React, { useEffect, useState } from "react";

export default function OrderHistory({ account, contract }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const result = [];
        let index = 0;
        while (true) {
          try {
            const item = await contract.methods.orderHistory(account, index).call();
            result.push(item);
            index++;
          } catch {
            break; // stop when we hit an out-of-range index
          }
        }
        setOrders(result);
      } catch (err) {
        console.error("Failed to load order history", err);
      }
    };
    loadHistory();
  }, [account, contract]);

  return (
    <div className="p-4 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {orders.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
