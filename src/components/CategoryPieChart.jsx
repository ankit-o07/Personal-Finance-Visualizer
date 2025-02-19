"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CategoryPieChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, transactionsRes] = await Promise.all([
          fetch("/api/categories").then((res) => res.json()),
          fetch("/api/transactions").then((res) => res.json()),
        ]);

        console.log("Categories API Response:", categoriesRes);
        console.log("Transactions API Response:", transactionsRes);

        if (!Array.isArray(categoriesRes) || !Array.isArray(transactionsRes)) {
          throw new Error("Invalid API response format");
        }

        const spendingByCategory = transactionsRes.reduce((acc, transaction) => {
          const categoryId = transaction.category?._id?.toString();
          if (!categoryId) return acc;
          acc[categoryId] = (acc[categoryId] || 0) + transaction.amount;
          return acc;
        }, {});

        const data = categoriesRes.map((cat, index) => ({
          name: cat.name,
          value: spendingByCategory[cat._id.toString()] || 0,
          color: COLORS[index % COLORS.length],
        }));

        console.log("Processed Chart Data:", data);

        setCategoryData([...data]);
        toast.success("Data loaded successfully!");
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load category data.");
        toast.error("Failed to load category data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-center">Spending by Category</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading data...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : categoryData.every((item) => item.value === 0) ? (
        <p className="text-gray-500 text-center">No spending data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryPieChart;
