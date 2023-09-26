"use client";
import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import { Tarefa } from "@prisma/client";
import { AlertTriangle, ArrowRight, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import { dateFormat } from "@/utils/dateFormat";

import { Meta as PMeta } from ".prisma/client";

interface Meta extends PMeta {
  tarefas?: Tarefa[];
}

interface Props {
  tarefas?: Tarefa[];
  idMeta: string;
  atualizarTarefa(
    tarefa: Prisma.TarefaUpdateInput
  ): Promise<"success" | "failure">;
  carregarMeta(
    idUsuario: string,
    comRelacoes: boolean
  ): Promise<Meta | undefined>;
}

const TarefaEsquemaCores = {
  AGUARDANDO: "text-orange-600 bg-orange-100 border-orange-300",
  EMANDAMENTO: "text-cyan-600 bg-cyan-100 border-cyan-300",
  CONCLUIDO: "text-emerald-600 bg-emerald-100 border-emerald-300",
  CANCELADO: "text-rose-600 bg-rose-100 border-rose-300",
};

const proximoStatus = {
  AGUARDANDO: "EMANDAMENTO",
  EMANDAMENTO: "CONCLUIDO",
  CANCELADO: "CANCELADO",
};

export function ListaTarefas({
  atualizarTarefa,
  carregarMeta,
  idMeta,
  tarefas,
}: Props): ReactElement | null {
  const [listaTarefas, setListaTarefas] = useState(tarefas);

  async function atualizarStatusTarefa(
    id: string,
    status: typeof Tarefa.status
  ) {
    const respostaAtualizarTarefa = await atualizarTarefa({
      id,
      status: proximoStatus[status],
    });

    if (respostaAtualizarTarefa === "success") {
      carregarMeta(idMeta, true).then((meta) => {
        setListaTarefas(meta?.tarefas);

        toast("Status da Tarefa atualizado!", { type: "success" });
      });
    } else {
      toast("Falha ao atualizar o status da Tarefa.", { type: "error" });
    }
  }

  if (!tarefas || tarefas.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <AlertTriangle className="min-h-[1.75rem] min-w-[1.75rem] text-amber-500" />
        <h3>Essa Meta não possui Tarefas cadastradas</h3>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {listaTarefas.map((tarefa) => (
        <div
          className={`flex w-full gap-3 rounded-lg border p-3 ${
            TarefaEsquemaCores[tarefa.status]
          }`}
          key={tarefa.id}
        >
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <small className="text-xs font-bold">
                {tarefa.status === "EMANDAMENTO"
                  ? "EM ANDAMENTO"
                  : tarefa.status}
              </small>
              &bull;{" "}
              <small className="text-xs font-medium">
                de <b>{dateFormat(new Date(tarefa.inicio))}</b> à{" "}
                <b>{dateFormat(new Date(tarefa.fim))}</b>
              </small>
            </div>
            <h4 className="text-lg font-semibold">{tarefa.titulo}</h4>
            <span>
              {tarefa.descricao ?? "Não há descrição para esta tarefa"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              disabled={
                tarefa.status === "CONCLUIDO" || tarefa.status === "CANCELADO"
              }
              title="Excluir Tarefa"
              variant="danger"
              onClick={() => atualizarStatusTarefa(tarefa.id, "CANCELADO")}
              LeftIcon={Trash2}
            />
            <Button
              disabled={
                tarefa.status === "CONCLUIDO" || tarefa.status === "CANCELADO"
              }
              onClick={() => atualizarStatusTarefa(tarefa.id, tarefa.status)}
              title="Alterar para o próximo estado"
              variant="info"
              LeftIcon={ArrowRight}
            />
          </div>
        </div>
      ))}
    </ul>
  );
}
