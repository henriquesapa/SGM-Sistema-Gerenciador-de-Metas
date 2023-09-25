import { Tarefa } from "@prisma/client";
import { AlertTriangle, Check, Trash2 } from "lucide-react";

import { Button } from "@/components/Button";

interface Props {
  tarefas?: Tarefa[];
}

const TarefaEsquemaCores = {
  AGUARDANDO: "text-orange-600 bg-orange-100 border-orange-300",
  EMANDAMENTO: "",
  CONCLUIDO: "",
  CANCELADO: "",
};

export function ListaTarefas({ tarefas }: Props) {
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
      {tarefas.map((tarefa) => (
        <div
          className={`flex w-full gap-3 rounded-lg border p-3 ${
            TarefaEsquemaCores[tarefa.status]
          }`}
          key={tarefa.id}
        >
          <div className="flex flex-1 flex-col gap-1">
            <h4 className="text-lg font-semibold">{tarefa.titulo}</h4>
            <span>
              {tarefa.descricao ?? "Não há descrição para esta tarefa"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="danger" LeftIcon={Trash2} />
            <Button variant="success" LeftIcon={Check} />
          </div>
        </div>
      ))}
    </ul>
  );
}
