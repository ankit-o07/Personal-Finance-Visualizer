"use client";

import React, { useState, useEffect } from "react";
import ExpenseChart from "@/components/ExpenseChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import RecentTransactions from "@/components/RecentTransactions";
import SpendingInsights from "@/components/SpendingInsights";

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    async function fetchTotalExpenses() {
      const response = await fetch("/api/transactions");
      const transactions = await response.json();
      const total = transactions.reduce((sum, t) => sum + t.amount, 0);
      setTotalExpenses(total);
    }

    fetchTotalExpenses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-500">₹{totalExpenses}</p>
          <div className="mt-4">
          <SpendingInsights></SpendingInsights>
          </div>
        </div>
        <CategoryPieChart />
      </div>

      {/* Transaction History & Expense Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <RecentTransactions />
        <ExpenseChart />
      </div>
    </div>
  );
};

export default Dashboard;
