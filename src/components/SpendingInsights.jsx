import React, { useEffect, useState } from "react";

const SpendingInsights = () => {
  const [insights, setInsights] = useState({
    totalSpent: 0,
    highestCategory: "N/A",
    remainingBudget: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const [categoriesRes, transactionsRes] = await Promise.all([
        fetch("/api/categories").then((res) => res.json()),
        fetch("/api/transactions").then((res) => res.json()),
      ]);

      let totalSpent = 0;
      const categorySpending = {};
      let totalBudget = categoriesRes.reduce((acc, cat) => acc + cat.budget, 0);

      transactionsRes.forEach((transaction) => {
        const categoryId = transaction.category?._id;
        if (categoryId) {
          totalSpent += transaction.amount;
          categorySpending[categoryId] =
            (categorySpending[categoryId] || 0) + transaction.amount;
        }
      });

      // Find the highest spending category
      let highestCategory = "N/A";
      let maxSpent = 0;
      categoriesRes.forEach((cat) => {
        if (categorySpending[cat._id] > maxSpent) {
          maxSpent = categorySpending[cat._id];
          highestCategory = cat.name;
        }
      });

      setInsights({
        totalSpent,
        highestCategory,
        remainingBudget: totalBudget - totalSpent,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg text-gray-700">
      <h2 className="text-lg font-bold mb-4">Spending Insights</h2>
      <p className="mb-2">💰 <strong>Total Spent:</strong> ₹{insights.totalSpent}</p>
      <p className="mb-2">📊 <strong>Highest Spending Category:</strong> {insights.highestCategory}</p>
      <p className="mb-2">🏦 <strong>Remaining Budget:</strong> ₹{insights.remainingBudget}</p>
    </div>
  );
};

export default SpendingInsights;
