"use client"


import React, { useState, useEffect } from "react";

import CategorySelect from "./CategorySelect";

const TransactionForm = ({ transaction, onSave }) => {
  const [amount, setAmount] = useState(transaction?.amount || "");
  const [date, setDate] = useState(transaction?.date || "");
  const [description, setDescription] = useState(transaction?.description || "");
  const [category, setCategory] = useState(transaction?.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ amount, date, description, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="w-full p-2 border"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full p-2 border"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border"
      />
      <CategorySelect value={category} onChange={setCategory} />
      <button type="submit" className="btn">Save Transaction</button>
    </form>
  );
};

export default TransactionForm;
