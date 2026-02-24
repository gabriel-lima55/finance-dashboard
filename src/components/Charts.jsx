import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Charts({ transactions }) {
  const data = [
    {
      name: "Receitas",
      value: transactions
        .filter(t => t.type === "Receita")
        .reduce((acc, t) => acc + Number(t.amount), 0)
    },
    {
      name: "Despesas",
      value: transactions
        .filter(t => t.type === "Despesa")
        .reduce((acc, t) => acc + Number(t.amount), 0)
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 h-80">
      <h3 className="text-gray-500 mb-4 font-medium">Receitas x Despesas</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={value => `R$ ${Number(value || 0).toFixed(2)}`} />
          <Bar dataKey="value" fill="#3b82f6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}