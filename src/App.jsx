import { useEffect } from "react"
import "./App.css"

function App() {

  useEffect(() => {
    fetch("/api/")
      .then(res => res.text())
      .then(data => console.log(data))
  }, [])

  return (
    /*Insira o nome de seu Projeto*/
    <h1>NOME DO PROJETO</h1>
  )
}

export default App
