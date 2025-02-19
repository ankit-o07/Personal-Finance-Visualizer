"use client";
import React, { useState, useEffect } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import toast from "react-hot-toast";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      toast.error("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      toast.success("Transaction added successfully!");
      fetchTransactions(); // Refresh list
    } else {
      toast.error("Error adding transaction.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Transactions
      </h1>

      {/* Transaction Form */}
      <div className="mb-6">
        <TransactionForm onSave={handleAddTransaction} />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-600">Loading transactions...</p>
      ) : transactions.length > 0 ? (
        <TransactionList transactions={transactions} refreshTransactions={fetchTransactions} />
      ) : (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionsPage;
