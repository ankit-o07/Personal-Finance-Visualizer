
import { Transaction, Category } from "@/models/Transaction";
import connectDB from "@/lib/db";

export async function PATCH(request, { params }) {
    console.log("test patch")
    await connectDB();
    const { amount, date, description, category } = await request.json();
    const { id } = params; 

    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { amount, date, description, category },
        { new: true }
      );
  
      if (!updatedTransaction) {
        return new Response(JSON.stringify({ error: "Transaction not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(updatedTransaction), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to update transaction" }), { status: 500 });
    }
  }
  