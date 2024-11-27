import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";

function ProdutoAlterar() {
  const { id } = useParams();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [titulo, setTitulo] = useState("");
  const [criadoEm, setCriadoEm] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get<Tarefa>(
          `http://localhost:5000/api/tarefas/buscar/${id}`
        )
        .then((resposta) => {
          setTitulo(resposta.data.titulo);
          setDescricao(resposta.data.descricao);
          setCriadoEm(resposta.data.criadoEm!);
          setStatus(resposta.data.status);
          buscarCategorias();
        });
    }
  }, []);

  function buscarCategorias() {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  }

  function enviarTarefa(e: any) {
    e.preventDefault();

    const tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      criadoEm: criadoEm,
      status: status,
      categoriaId: categoriaId,
    };

    axios
      .put(`http://localhost:5020/api/tarefas/alterar/${id}`, tarefa)
      .then((resposta) => {
        console.log(resposta.data);
      });
  }

  return (
    <div id="alterar-tarefa" className="container">
      <h1>Alterar Tarefa</h1>
      <form onSubmit={enviarTarefa}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            required
            onChange={(e: any) => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            name="descricao"
            onChange={(e: any) => setDescricao(e.target.value)}
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

        
        <div>
          <label htmlFor="status">Status</label>
          <select
            onClick={(e: any) => setStatus(e.target.value)}
          >
            <label htmlFor="status">Status</label>
            <input
                type="text"
                id="status"
                value={status}
                name="status"
                onChange={(e: any) => setStatus(e.target.value)}
            />
          </select>
        </div>

        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
  );
}

export default ProdutoAlterar;
