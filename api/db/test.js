import pool from "./connection.js"

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()")
    console.log("Conexão OK:", res.rows[0])
  } catch (err) {
    console.error("Erro na conexão:", err)
  } finally {
    pool.end()
  }
}

testConnection()