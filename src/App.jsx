import { useEffect, useState } from "react";
import { getTransactions, getGoals } from "./api";
import Form from "./components/Form";
import { deleteTransaction, deleteGoal } from "./api";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  

  // Função para carregar os dados
  const reloadData = async () => {
    try {
      const tData = await getTransactions();
      const gData = await getGoals();
      setTransactions(tData);
      setGoals(gData);
    } catch (err) {
      console.error("Erro ao conectar com o backend:", err);
    }
  };
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      await deleteTransaction(id);
      reloadData();
    }
  };
  const handleDeleteGoal = async (id) => {
  if (window.confirm("Deseja excluir esta meta?")) {
    await deleteGoal(id);
    reloadData();
  }
};

  useEffect(() => {
    reloadData();
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meu Dashboard Financeiro</h1>

      {/* DASHBOARD - RESUMO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
        <p className="text-gray-500 text-sm font-medium uppercase">Receitas</p>
        <p className="text-2xl font-bold text-green-600">R$ {totalIncome.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500">
        <p className="text-gray-500 text-sm font-medium uppercase">Despesas</p>
        <p className="text-2xl font-bold text-red-600">R$ {totalExpense.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
        <p className="text-gray-500 text-sm font-medium uppercase">Saldo Total</p>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
          R$ {balance.toFixed(2)}
        </p>
      </div>
    </div>

    {/* FORMULÁRIO */}
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <Form reloadData={reloadData} />
    </div>

    {/* LISTA DE TRANSAÇÕES */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-700">Histórico de Transações</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Descrição</th>
              <th className="px-6 py-3">Categoria</th>
              <th className="px-6 py-3">Valor</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">{t.description}</td>
                <td className="px-6 py-4 text-gray-600">{t.category}</td>
                <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'} R$ {Number(t.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500 hover:text-red-700 font-medium p-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-400">Nenhuma transação encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* SEÇÃO DE METAS (GOALS) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Minhas Metas 🎯</h2>
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id} className="relative p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-700">{goal.title}</h3>
                    <p className="text-sm text-gray-500">
                      Alvo: R$ {Number(goal.target_amount).toFixed(2)}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    Excluir
                  </button>
                </div>
                
                {/* Barra de Progresso Simples (Baseada no Saldo Total) */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min((balance / goal.target_amount) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-right text-xs mt-1 text-gray-500">
                  {Math.round(Math.min((balance / goal.target_amount) * 100, 100))}% concluído
                </p>
              </div>
            ))}
            
            {goals.length === 0 && (
              <p className="text-center text-gray-400 py-4">Nenhuma meta cadastrada.</p>
            )}
          </div>
        </div>

        {/* ESPAÇO PARA DICAS OU GRÁFICO*/}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col justify-center">
          <h3 className="text-blue-800 font-bold mb-2">Dica Financeira</h3>
          <p className="text-blue-600 text-sm">
            O segredo para atingir suas metas é a constância. Tente poupar pelo menos 10% da sua receita mensal!
          </p>
        </div>
      </div>
      {/* RODAPÉ DE CRÉDITOS */}
      <footer className="mt-12 pb-6 text-center">
        <hr className="border-gray-300 mb-6" />
        <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
          Desenvolvido com <span className="text-red-500">❤️</span> por 
          <span className="font-bold text-gray-700"> Gabriel Lima</span>
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a 
            href="https://github.com/seu-usuario" 
            target="_blank" 
            className="text-gray-400 hover:text-gray-800 text-xs transition-colors"
          >
            GitHub
          </a>
          <span className="text-gray-300">•</span>
          <a 
            href="https://linkedin.com/in/seu-perfil" 
            target="_blank" 
            className="text-gray-400 hover:text-blue-600 text-xs transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400 text-xs">© 2024</span>
        </div>
      </footer>
    </div>
  );
  
    
}