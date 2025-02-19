"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Menu, MenuIcon, DollarSign, BarChart, FileText } from "lucide-react";
import ExpenseBreakdown from "@/components/ExpenseBreakdown";
import toast from "react-hot-toast";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch transactions & categories
  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  // Handle adding a transaction
  const handleAddTransaction = async (newTransaction) => {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      toast.success("Transaction added successfully!");
      fetchTransactions();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
     

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <MenuIcon size={24} />
          </button>
          <Link href="/dashboard">
            <h1 className="text-xl font-semibold text-gray-800 cursor-pointer hover:underline">
              Dashboard
            </h1>
          </Link>
          <div className="text-gray-600">Welcome, User!</div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Add Transaction */}
            <div className="bg-white p-6 shadow-lg rounded-xl border col-span-1">
              <h2 className="text-lg font-semibold text-gray-700">Quick Add Transaction</h2>
              <TransactionForm onSave={handleAddTransaction} categories={categories} refreshCategories={fetchCategories} />
            </div>

            {/* Expense Breakdown Chart */}
            <div className="bg-white p-6 shadow-lg rounded-xl border col-span-1 md:col-span-2 lg:col-span-2">
              <ExpenseBreakdown transactions={transactions} />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 shadow-lg rounded-xl border col-span-1 md:col-span-3">
              <h2 className="text-lg font-semibold text-gray-700">Recent Transactions</h2>
              <TransactionList transactions={transactions.slice(-5)} refreshTransactions={fetchTransactions} />
              <div className="mt-2 text-right">
                <Link href="/transactions" className="text-blue-600 font-medium hover:underline">View All Transactions →</Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6361", "#58508D"];


// const aggregateData = (transactions) => {
//   const categoryMap = {};
//   transactions.forEach(({ category, amount }) => {
//     if (category?.name) {
//       categoryMap[category.name] = (categoryMap[category.name] || 0) + amount;
//     }
//   });

//   return Object.keys(categoryMap).map((name) => ({ name, value: categoryMap[name] }));
// };
