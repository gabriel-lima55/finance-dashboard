import React, { useState, useEffect } from 'react'; // 1. Importar o useEffect
import api from '../api'; // Importar sua instância do Axios

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  // 2. O useEffect entra AQUI
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data); // Salva os dados no estado
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };

    loadData();
  }, []); // O array vazio [] garante que ele rode apenas UMA VEZ ao abrir a página

  return (
    <div>
      {/* 3. O restante do seu HTML/JSX */}
      {transactions.map(t => <p key={t.id}>{t.description}</p>)}
    </div>
  );
};

export default Transactions;