import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";
import axios from "axios";

function TarefaCadastro() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [titulo, setTitulo] = useState("");
  const [criadoEm, setCriadoEm] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  });

  function enviarTarefa(e: any) {
    e.preventDefault();

    const tarefa: Tarefa = {
      titulo: titulo,
      criadoEm: criadoEm,
      descricao: descricao,
      status: status,
      categoriaId: categoriaId,
    };

    fetch("http://localhost:5000/api/tarefas/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((tarefa) => {
        console.log("Trefa cadastrada", tarefa);
      });
  }

  return (
    <div id="cadastrar_tarefa" className="container">
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={enviarTarefa}>
        <div>
          <label htmlFor="nome">Titulo</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            required
            onChange={(e: any) => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="criadoEm">Criado Em</label>
          <input
            type="text"
            id="criadoEm"
            name="criadoEm"
            onChange={(e: any) => setCriadoEm(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            onChange={(e: any) => setStatus(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="categoria">Categorias</label>
          <select
            onChange={(e: any) => setCategoriaId(e.target.value)}
          >
            {categorias.map((categoria) => (
              <option
                value={categoria.categoriaId}
                key={categoria.categoriaId}
              >
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Cadastrar Tarefa</button>
      </form>
    </div>
  );
}

export default TarefaCadastro;
