"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import CategorySelect from "@/components/CategorySelect";

export default function BudgetPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const response = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId: selectedCategory, budget: Number(budget) }),
    });
    console.log(response)
    if (response.ok) {
      
      toast.success("Budget updated!");
    } else {
      
      toast.error("Error updating budget.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Set Budget</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
       {/* <CategorySelect></CategorySelect> */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Budget Amount"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Update Budget
        </button>
      </form>
    </div>
  );
}
