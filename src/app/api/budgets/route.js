import connectDB from "@/lib/db";
import { Category } from "@/models/Transaction";

export async function GET() {
  await connectDB();
  const budgets = await Category.find({}, "name budget");
  return Response.json(budgets);
}

export async function POST(req) {
  console.log("TEST")
  await connectDB();
  const { categoryId, budget } = await req.json();
  console.log(categoryId , budget)
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { budget },
      { new: true }
    );

    if (!updatedCategory) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    return Response.json(updatedCategory);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
