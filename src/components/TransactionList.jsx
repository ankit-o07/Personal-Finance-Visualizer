"use client"
import React, { useState } from "react";
import toast from "react-hot-toast";

const TransactionList = ({ transactions, refreshTransactions }) => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [updatedTransaction, setUpdatedTransaction] = useState({});

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/transactions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete transaction");

      toast.success("Transaction deleted successfully!");
      refreshTransactions();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction._id);
    setUpdatedTransaction(transaction);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    console.log("Updating Transaction:", updatedTransaction); // Debugging Log
  
    try {
      const response = await fetch(`/api/transactions/${updatedTransaction._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: updatedTransaction.description,
          amount: updatedTransaction.amount,
          date: updatedTransaction.date,
          category: updatedTransaction.category,
        }),
      });
  
      const data = await response.json();
      console.log("Response:", data); // Debugging Log
  
      if (!response.ok) throw new Error(data.error || "Failed to update transaction");
  
      toast.success("Transaction updated successfully!");
      setEditingTransaction(null);
      refreshTransactions();
    } catch (error) {
      toast.error(error.message);
      console.error("Update Error:", error);
    }
  };
  

  return (
    <div className="mt-4">
      
      <h2 className="text-lg font-semibold">Recent Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((transaction) => {
          const formattedDate = new Date(transaction.date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <li key={transaction._id} className="border p-2 flex justify-between">
              {editingTransaction === transaction._id ? (
                <form onSubmit={handleUpdate} className="w-full flex gap-2">
                  <input
                    type="text"
                    value={updatedTransaction.description}
                    onChange={(e) => setUpdatedTransaction({ ...updatedTransaction, description: e.target.value })}
                    className="border p-1 flex-grow"
                  />
                  <input
                    type="number"
                    value={updatedTransaction.amount}
                    onChange={(e) => setUpdatedTransaction({ ...updatedTransaction, amount: e.target.value })}
                    className="border p-1 w-24"
                  />
                  <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">
                    Save
                  </button>
                  <button onClick={() => setEditingTransaction(null)} className="bg-gray-500 text-white px-2 py-1 rounded">
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <div>
                    <p className="font-semibold">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                    <p className="text-sm text-gray-500">₹{transaction.amount} ({transaction.category?.name})</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(transaction)} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(transaction._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionList;
