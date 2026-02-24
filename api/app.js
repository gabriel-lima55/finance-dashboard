import express from "express"
import cors from "cors"
import transactionsRoutes from "./routes/transactions.js"
import goalsRoutes from "./routes/goals.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("FUNCIONANDO PERFEITAMENTE")
})

app.use("/transactions", transactionsRoutes)
app.use("/goals", goalsRoutes)

export default app