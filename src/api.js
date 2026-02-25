// src/api.js

// Se o site estiver rodando na Vercel, ele usa o link do Render. 
// Se estiver no seu PC, ele usa o localhost.
const BASE_URL = import.meta.env.MODE === 'production' 
  ? "https://finance-dashboard-ws.onrender.com" 
  : "http://localhost:5000";

// O restante das suas funções (getTransactions, etc) continua igual abaixo...
// --- TRANSACTIONS ---

export async function getTransactions() {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error("Erro ao buscar transações");
  return res.json();
}

export async function createTransaction(data) {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Erro ao criar transação");
  return res.json();
}

export async function deleteTransaction(id) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Erro ao deletar transação");
  return true;
}

// --- GOALS ---

export async function getGoals() {
  const res = await fetch(`${BASE_URL}/goals`);
  if (!res.ok) throw new Error("Erro ao buscar metas");
  return res.json();
}

export async function createGoal(data) {
  const res = await fetch(`${BASE_URL}/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Erro ao criar meta");
  return res.json();
}

export async function deleteGoal(id) {
  const res = await fetch(`${BASE_URL}/goals/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Erro ao deletar meta");
  return true;
}