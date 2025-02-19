import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CategorySelect = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const addedCategory = await response.json();
      setCategories([...categories, addedCategory]);
      onChange(addedCategory._id);
      setNewCategory("");
      setIsAdding(false);
      toast.success("Category added successfully!");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="relative w-full">
      <select
        value={isAdding ? "add-new" : value}
        onChange={(e) => {
          if (e.target.value === "add-new") {
            setIsAdding(true);
          } else {
            setIsAdding(false);
            onChange(e.target.value);
          }
        }}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
        <option value="add-new" className="text-blue-500">
          + Add New Category
        </option>
      </select>

      {isAdding && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
