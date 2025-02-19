
import { Transaction, Category } from "@/models/Transaction";
import connectDB from "@/lib/db";




export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().populate("category", "name");
  return new Response(JSON.stringify(transactions), { status: 200 });
}


export async function POST(request) {
  await connectDB();
  const { amount, date, description, category } = await request.json();

  try {
    const newTransaction = new Transaction({ amount, date, description, category });
    await newTransaction.save();
    return new Response(JSON.stringify(newTransaction), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create transaction" }), { status: 500 });
  }
}


export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json();

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Transaction deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete transaction" }), { status: 500 });
  }
}



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
  