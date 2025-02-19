"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function BudgetPage() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/categories", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryId: editingCategory._id,
        name: editingCategory.name,
        description: editingCategory.description,
        budget: Number(editingCategory.budget),
      }),
    });

    if (response.ok) {
      toast.success("Category updated successfully!");
      fetchCategories();
      setEditingCategory(null);
    } else {
      toast.error("Error updating category.");
    }

    setLoading(false);
  };

  const handleDelete = async (categoryId) => {
    

    setLoading(true);

    const response = await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId }),
    });

    if (response.ok) {
      toast.success("Category deleted successfully!");
      fetchCategories();
    } else {
      toast.error("Error deleting category.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Add Category</h1>
        <Link href="/categories/new">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            + New Category
          </button>
        </Link>
      </div>

      
      <h2 className="text-lg font-bold mt-6">Categories</h2>
      <ul className="space-y-2 mt-2">
        {categories.map((cat) => (
          <li key={cat._id} className="border p-2 rounded">
            {editingCategory && editingCategory._id === cat._id ? (
              // Edit Form
              <form onSubmit={handleUpdate} className="space-y-2">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  value={editingCategory.budget}
                  onChange={(e) => setEditingCategory({ ...editingCategory, budget: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-between">
                  <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{cat.name}</p>
                  <p className="text-sm text-gray-500">{cat.description}</p>
                  <p className="text-sm text-gray-500">Budget: ₹{cat.budget}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
