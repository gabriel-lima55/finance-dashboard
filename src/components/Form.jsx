import { useState } from "react";
// 1. Importar a função de criar transação
import { createTransaction, createGoal } from "../api";

export default function Form({ reloadData }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  const [goalTitle, setGoalTitle] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");

  // 2. Criar a função handleTransaction (igual ao handleGoal)
  const handleTransaction = async () => {
    if (!desc || !amount || !category) return alert("Preencha todos os campos da transação");
    
    try {
      await createTransaction({
        description: desc,
        amount: Number(amount),
        type, // 'income' ou 'expense'
        category,
        date: new Date().toISOString().split("T")[0], // Data de hoje formatada
      });

      // Limpar campos após sucesso
      setDesc(""); 
      setAmount(""); 
      setCategory(""); 
      setType("income");

      // Atualizar a lista na tela
      reloadData();
      alert("Transação criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const handleGoal = async () => {
    if (!goalTitle || !goalAmount || !goalDeadline) return alert("Preencha todos os campos do objetivo");
    
    await createGoal({
      title: goalTitle,
      target_amount: Number(goalAmount),
      deadline: goalDeadline
    });
    
    setGoalTitle(""); setGoalAmount(""); setGoalDeadline("");
    reloadData();
  };

  return (
    <div className="space-y-6">
      {/* Transaction Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Criar Transaction</h2>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Descrição" value={desc} onChange={e => setDesc(e.target.value)} />
        <input className="w-full mb-2 p-2 border rounded" type="number" placeholder="Valor" value={amount} onChange={e => setAmount(e.target.value)} />
        <select className="w-full mb-2 p-2 border rounded" value={type} onChange={e => setType(e.target.value)}>
          <option value="income">Receita (Income)</option>
          <option value="expense">Despesa (Expense)</option>
        </select>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} />
        
        {/* 3. Adicionar o Botão que faltava */}
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full mt-2" 
          onClick={handleTransaction}
        >
          Criar Transação
        </button>
      </div>

      {/* Goal Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Criar Goal</h2>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Título" value={goalTitle} onChange={e => setGoalTitle(e.target.value)} />
        <input className="w-full mb-2 p-2 border rounded" type="number" placeholder="Valor alvo" value={goalAmount} onChange={e => setGoalAmount(e.target.value)} />
        <input type="date" className="w-full mb-2 p-2 border rounded" value={goalDeadline} onChange={e => setGoalDeadline(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mt-2" onClick={handleGoal}>
          Criar Goal
        </button>
      </div>
    </div>
  );
}