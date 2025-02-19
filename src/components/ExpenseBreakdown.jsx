import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Colors for the bar chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6361", "#58508D"];

const aggregateData = (transactions) => {
  const categoryMap = {};
  transactions.forEach(({ category, amount }) => {
    if (category?.name) {
      categoryMap[category.name] = (categoryMap[category.name] || 0) + amount;
    }
  });

  return Object.keys(categoryMap).map((name, index) => ({
    name,
    value: categoryMap[name],
    fill: COLORS[index % COLORS.length], 
  }));
};

export default function ExpenseBreakdown({ transactions }) {
  const data = aggregateData(transactions);

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl border">
      <h2 className="text-lg font-semibold text-gray-700">Expense Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tickFormatter={(value) => `₹${value}`} />
          <Tooltip formatter={(value) => [`₹${value}`, "Spent"]} />
          <Bar dataKey="value" barSize={40} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
