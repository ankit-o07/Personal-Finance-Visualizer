import React, { useEffect, useState } from "react";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      setTransactions(data.slice(0, 5)); 
    }
    fetchTransactions();
  }, []);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id} className="border-b py-2">
            <p className="text-sm text-gray-700">{transaction.description}</p>
            <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
            <p className="text-sm font-bold text-blue-500">₹{transaction.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
