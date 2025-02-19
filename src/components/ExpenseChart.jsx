import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const BudgetVsActualChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [categoriesRes, transactionsRes] = await Promise.all([
        fetch("/api/categories").then((res) => res.json()),
        fetch("/api/transactions").then((res) => res.json()),
      ]);

      // Compute actual spending per category
      const spendingByCategory = transactionsRes.reduce((acc, transaction) => {
        const categoryId = transaction.category?._id;
        if (!categoryId) return acc;
        acc[categoryId] = (acc[categoryId] || 0) + transaction.amount;
        return acc;
      }, {});

      // Format data for the chart
      const data = categoriesRes.map((cat) => ({
        name: cat.name,
        budget: cat.budget || 0,
        actual: spendingByCategory[cat._id] || 0,
      }));

      setChartData(data);
    }

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Budget vs Actual Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
          <Bar dataKey="actual" fill="#8884d8" name="Actual Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetVsActualChart;
