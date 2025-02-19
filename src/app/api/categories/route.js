import { Category } from "@/models/Transaction";
import connectDB from "@/lib/db";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return Response.json(categories, { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const { name, budget, description } = await req.json();

  try {
    const newCategory = new Category({
      name,
      budget: budget ? Number(budget) : 0,
      description: description || "",
    });

    await newCategory.save();
    return Response.json(newCategory, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

// PATCH (Update Category)
export async function PATCH(req) {
  await connectDB();
  const { categoryId, name, budget, description } = await req.json();

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { 
        name, 
        budget: budget ? Number(budget) : undefined, 
        description 
      },
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

// DELETE (Remove Category)
export async function DELETE(req) {
  await connectDB();
  const { categoryId } = await req.json();

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    return Response.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
