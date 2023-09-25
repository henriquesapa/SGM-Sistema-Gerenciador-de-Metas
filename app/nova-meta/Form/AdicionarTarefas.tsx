"use client";
import { Dispatch, SetStateAction } from "react";
import { Tarefa } from "@prisma/client";
import { AlertOctagon, Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";

interface Props {
  tarefas: Tarefa[];
  setTarefas: Dispatch<SetStateAction<Tarefa[]>>;
}

export function AdicionarTarefas({ tarefas, setTarefas }: Props) {
  function adicionarTarefaVazia() {
    setTarefas((prevState) => [...prevState, { id: uuidv4() }]);
  }

  function removerTarefa(id: string) {
    setTarefas((prevState) => prevState.filter((tarefa) => tarefa.id !== id));
  }

  function atualizarTarefa(id: string, chave: keyof Tarefa, valor: any) {
    const tarefa = tarefas.find((t) => t.id === id);
    tarefa[chave] = valor;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-primary-600">Tarefas</h1>
        <Button onClick={adicionarTarefaVazia} LeftIcon={Plus} type="button">
          Nova Tarefa
        </Button>
      </div>
      {tarefas.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {tarefas.map((tarefa) => (
            <div
              className="flex flex-col gap-1 rounded-lg border border-primary-600 p-3"
              key={tarefa.id}
            >
              <Input
                label="Título"
                onChange={(e) =>
                  atualizarTarefa(tarefa.id, "titulo", e.target.value)
                }
                value={tarefa.titulo}
                type="text"
              />
              <Textarea
                label="Descrição"
                onChange={(e) =>
                  atualizarTarefa(tarefa.id, "descricao", e.target.value)
                }
                value={tarefa.descricao}
                type="text"
              />

              <div className="mb-2 flex gap-1">
                <Input
                  label="Data de Inicio"
                  onChange={(e) =>
                    atualizarTarefa(
                      tarefa.id,
                      "inicio",
                      new Date(e.target.value)
                    )
                  }
                  value={tarefa.inicio}
                  type="datetime-local"
                />
                <Input
                  label="Data de Término"
                  onChange={(e) =>
                    atualizarTarefa(tarefa.id, "fim", new Date(e.target.value))
                  }
                  value={tarefa.fim}
                  type="datetime-local"
                />
              </div>
              <Button
                variant="danger"
                LeftIcon={Trash2}
                onClick={() => removerTarefa(tarefa.id)}
                type="button"
              >
                Remover Tarefa
              </Button>
            </div>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1">
          <AlertOctagon />
          <p>Essa meta ainda não tem tarefas</p>
        </div>
      )}
    </div>
  );
}
