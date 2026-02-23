import express from "express"
import pool from "../db/connection.js"

const router = express.Router()

// Criar meta
router.post("/", async (req, res) => {
  try {
    const { title, target_amount, current_amount, deadline } = req.body

    const result = await pool.query(
      `
      INSERT INTO goals (title, target_amount, current_amount, deadline)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [title, target_amount, current_amount || 0, deadline]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao criar meta" })
  }
})

// Listar metas
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM goals ORDER BY deadline ASC"
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar metas" })
  }
})

// Atualizar meta
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { title, target_amount, current_amount, deadline } = req.body

    const result = await pool.query(
      `
      UPDATE goals
      SET title = $1,
          target_amount = $2,
          current_amount = $3,
          deadline = $4
      WHERE id = $5
      RETURNING *
      `,
      [title, target_amount, current_amount, deadline, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Meta não encontrada" })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao atualizar meta" })
  }
})

// Deletar meta
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM goals WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Meta não encontrada" })
    }

    res.json({ message: "Meta deletada com sucesso" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao deletar meta" })
  }
})

export default router