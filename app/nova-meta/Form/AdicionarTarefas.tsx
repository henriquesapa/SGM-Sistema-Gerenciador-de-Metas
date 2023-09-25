"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { Tarefa } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AlertOctagon, Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";

import "dayjs/locale/pt-br";
dayjs.extend(utc);
dayjs.locale("pt-br");

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
    const lista = [...tarefas];
    const tarefa = lista.find((t) => t.id === id);
    tarefa[chave] = valor;

    setTarefas(lista);
  }

  const handleValueChange = (id: string, { startDate, endDate }) => {
    console.log(id, startDate, endDate);
    atualizarTarefa(id, "inicio", dayjs(startDate).utc().toDate());
    atualizarTarefa(id, "fim", dayjs(endDate).utc().toDate());
  };

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
              className="flex flex-col gap-2 rounded-lg border border-primary-600 p-3"
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

              <div className="flex flex-col gap-y-0.5">
                <label>Período</label>
                <Datepicker
                  useRange
                  displayFormat="DD [de] MMMM [de] YYYY"
                  i18n="pt-br"
                  minDate={new Date()}
                  onChange={(newValue) =>
                    handleValueChange(tarefa.id, newValue)
                  }
                  placeholder="Escolha um período de tempo"
                  value={{
                    startDate: new Date(tarefa.inicio),
                    endDate: new Date(tarefa.fim),
                  }}
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
