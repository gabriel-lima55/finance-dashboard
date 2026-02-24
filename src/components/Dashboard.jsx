import Sidebar from "./Sidebar";
import BalanceCard from "./BalanceCard";
import Charts from "./Charts";

export default function Dashboard({ transactions, reloadTransactions }) {
  // Calcula saldos
  const daily = transactions.reduce((acc, t) => acc + (t.type === "Receita" ? Number(t.amount) : -Number(t.amount)), 0);
  const monthly = daily; // simplificação; pode ser calculado por mês
  const yearly = daily; // simplificação; pode ser calculado por ano

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Financeiro</h1>

        {/* Balance Cards */}
        <BalanceCard daily={daily} monthly={monthly} yearly={yearly} />

        {/* Charts */}
        <div className="mt-6">
          <Charts transactions={transactions} />
        </div>

        {/* Transactions */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Transações Recentes</h2>
          <div className="grid gap-4">
            {transactions.map((t) => (
              <div
                key={t.id}
                className={`flex justify-between items-center p-4 rounded-lg shadow ${
                  t.type === "Receita" ? "bg-green-50 border-l-4 border-green-400" : "bg-red-50 border-l-4 border-red-400"
                }`}
              >
                <div>
                  <p className="font-medium text-gray-700">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.date}</p>
                </div>
                <div className={`font-semibold ${t.type === "Receita" ? "text-green-600" : "text-red-600"}`}>
                  {t.type === "Receita" ? "+" : "-"} R${t.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}