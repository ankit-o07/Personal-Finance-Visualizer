// models/Transaction.js
import mongoose from "mongoose";

// Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  budget: { type: Number, default: 0 },
});

// Transaction Schema with category reference
const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to Category
});

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export { Category, Transaction };
