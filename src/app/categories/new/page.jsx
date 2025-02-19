"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required!");
      return;
    }

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        budget: budget ? Number(budget) : 0,
        description, 
      }),
    });

    if (response.ok) {
        toast.success("Category created successfully!");
        setTimeout(() => router.push("/categories"), 1500); // Redirect after a short delay
    } else {
        toast.error("Error creating category. Please try again!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-4">Create a New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name Input */}
        <div>
          <label className="block font-medium">Category Name:</label>
          <input
            type="text"
            placeholder="E.g. Food, Rent, Entertainment"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Budget Input */}
        <div>
          <label className="block font-medium">Budget (Optional):</label>
          <input
            type="number"
            placeholder="Enter budget amount"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min="0"
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block font-medium">Description (Optional):</label>
          <textarea
            placeholder="Add details about this category..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mt-1 h-24"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
        >
          Create Category
        </button>
      </form>
    </div>
  );
}
