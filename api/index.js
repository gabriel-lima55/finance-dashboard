import express from 'express';
import cors from 'cors';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// --- ROTAS DAS TRANSAÇÕES ---

app.get('/api/transactions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/transactions', async (req, res) => {
  const { description, amount, type, category, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO transactions (description, amount, type, category, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [description, amount, type, category, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM transactions WHERE id = $1', [id]);
    res.json({ message: "Transação deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { description, amount, type, category, date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE transactions SET description=$1, amount=$2, type=$3, category=$4, date=$5 WHERE id=$6 RETURNING *',
      [description, amount, type, category, date, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ROTAS DOS GOALS (METAS) ---

app.get('/api/goals', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM goals');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/goals', async (req, res) => {
  const { title, target_amount, deadline } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO goals (title, target_amount, deadline) VALUES ($1, $2, $3) RETURNING *',
      [title, target_amount, deadline]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/goals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM goals WHERE id = $1', [id]);
    res.json({ message: "Meta deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/goals/:id', async (req, res) => {
  const { id } = req.params;
  const { title, target_amount, deadline } = req.body;
  try {
    const result = await pool.query(
      'UPDATE goals SET title=$1, target_amount=$2, deadline=$3 WHERE id=$4 RETURNING *',
      [title, target_amount, deadline, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- FINAL DO ARQUIVO ---

// 1. Exporta para a Vercel
export default app;

// 2. Escuta a porta localmente
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor ONLINE em http://localhost:${PORT}`);
});