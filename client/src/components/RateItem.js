import React, { useState } from "react";

export default function RateItem({ account, contract }) {
  const [itemId, setItemId] = useState(0);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const submitRating = async () => {
    try {
      await contract.methods.rateItem(itemId, stars, comment).send({ from: account });
      setMessage("Thanks for your feedback!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit rating.");
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">Rate a Coffee</h2>
      <label className="block mb-2">
        Item ID:
        <input
          type="number"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Stars (1-5):
        <input
          type="number"
          value={stars}
          min="1"
          max="5"
          onChange={(e) => setStars(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Feedback:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
      </label>
      <button
        onClick={submitRating}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
      {message && <p className="mt-2 text-blue-600">{message}</p>}
    </div>
  );
}
