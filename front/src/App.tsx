import React from "react";
import TarefaCadastro from "./components/pages/tarefa/TarefaCadastrar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import TarefaAlterar from "./components/pages/tarefa/TarefaAlterar";
import TarefaLista from "./components/pages/tarefa/TarefaListar";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/listar">Listar Tarefas</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/cadastrar">
                Cadastrar Tarefa
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TarefaLista />} />
          <Route
            path="/pages/tarefa/listar"
            element={<TarefaLista />}
          />
          <Route
            path="/pages/tarefa/cadastrar"
            element={<TarefaCadastro />}
          />
          <Route
            path="/pages/tarefa/alterar/:id"
            element={<TarefaAlterar />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
