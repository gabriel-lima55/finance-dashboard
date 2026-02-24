import express from "express"
import pool from "../db/connection.js"

const router = express.Router()

// Criar transação
router.post("/", async (req, res) => {
  try {
    const { description, amount, type, category, date } = req.body

    const result = await pool.query(
      `INSERT INTO transactions (description, amount, type, category, date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [description, amount, type, category, date]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao criar transação" })
  }
})


// Listar todas
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions ORDER BY date DESC"
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar transações" })
  }
})

// Saldo do dia
router.get("/summary/day", async (req, res) => {
  try {
    const { date } = req.query

    const result = await pool.query(
      `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)
        AS balance
      FROM transactions
      WHERE date = $1
      `,
      [date]
    )

    res.json({ balance: result.rows[0].balance || 0 })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao calcular saldo do dia" })
  }
})

router.get("/summary/month", async (req, res) => {
  try {
    const { month, year } = req.query

    const result = await pool.query(
      `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)
        AS balance
      FROM transactions
      WHERE EXTRACT(MONTH FROM date) = $1
      AND EXTRACT(YEAR FROM date) = $2
      `,
      [month, year]
    )

    res.json({ balance: result.rows[0].balance || 0 })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao calcular saldo do mês" })
  }
})

router.get("/summary/year", async (req, res) => {
  try {
    const { year } = req.query

    const result = await pool.query(
      `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)
        AS balance
      FROM transactions
      WHERE EXTRACT(YEAR FROM date) = $1
      `,
      [year]
    )

    res.json({ balance: result.rows[0].balance || 0 })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao calcular saldo do ano" })
  }
})

// Atualizar transação
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { description, amount, type, category, date } = req.body

    const result = await pool.query(
      `
      UPDATE transactions
      SET description = $1,
          amount = $2,
          type = $3,
          category = $4,
          date = $5
      WHERE id = $6
      RETURNING *
      `,
      [description, amount, type, category, date, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transação não encontrada" })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao atualizar transação" })
  }
})

// Deletar transação
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transação não encontrada" })
    }

    res.json({ message: "Transação deletada com sucesso" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao deletar transação" })
  }
})

export default router