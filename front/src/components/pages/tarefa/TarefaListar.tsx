import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import axios from "axios";
import { Link } from "react-router-dom";

function TarefaLista() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tarefas/listar")
      .then((resposta) => {
        return resposta.json();
      })
      .then((tarefas) => {
        setTarefas(tarefas);
      });
  });

  /*function deletar(id: string) {
    axios
      .delete(`http://localhost:5000/api/tarefas/deletar/${id}`)
      .then((resposta) => {
        console.log(resposta.data);
      });
  }*/

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado Em</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.status}</td>
              <td>{tarefa.categoria?.nome}</td>
              <td>{tarefa.criadoEm}</td>
              <td>
                <Link to={`/pages/tarefas/alterar/${tarefa.tarefaId}`}>
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaLista;
