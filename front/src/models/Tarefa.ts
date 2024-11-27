import { Categoria } from "./Categoria";

export interface Tarefa {
    tarefaId?: string;
    titulo: string;
    criadoEm?: string;
    descricao: string;
    status: string;
    categoriaId: string;
    categoria?: Categoria;
}