"use client";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Prisma, Tarefa } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { GerenciarTarefas } from "@/components/GerenciarTarefas";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";

import { Meta as PMeta } from ".prisma/client";

interface Meta extends PMeta {
  tarefas?: Tarefa[];
}

type Props = {
  meta: Meta;
  atualizarMeta(meta: Prisma.MetaUpdateInput): Promise<"success" | "failure">;
  carregarMeta(
    idMeta: string,
    comRelacoes?: boolean
  ): Promise<Meta | undefined>;
};

export function AtualizarMetaForm({
  atualizarMeta,
  carregarMeta,
  meta,
}: Props): ReactElement | null {
  const router = useRouter();
  const [tarefas, setTarefas] = useState<Tarefa[]>(meta.tarefas ?? []);
  const { formState, handleSubmit, register } = useForm<Prisma.MetaUpdateInput>(
    {
      defaultValues: {
        id: meta.id,
        titulo: meta.titulo,
        descricao: meta.descricao,
        id_usuario: meta.id_usuario,
      },
    }
  );

  const action: SubmitHandler<Prisma.MetaCreateInput> = async (data) => {
    const tarefasParaDesconectar = meta.tarefas?.filter(
      (tarefa) => !tarefas.includes(tarefa)
    );

    for (const tarefa of tarefasParaDesconectar) {
      await atualizarMeta({
        id: meta.id,
        tarefas: {
          delete: {
            id: tarefa.id,
          },
        },
      });
    }

    for (const tarefa of tarefas) {
      delete tarefa.id_meta;
      await atualizarMeta({
        id: meta.id,
        tarefas: {
          upsert: {
            where: {
              id: tarefa.id,
            },
            update: {
              ...tarefa,
            },
            create: {
              ...tarefa,
            },
          },
        },
      });
    }

    const resultadoAtualizarMeta = await atualizarMeta({
      ...data,
    });

    if (resultadoAtualizarMeta === "success") {
      // Mostrar Toast de Sucesso
      toast("Meta Atualizada!", { type: "success" });

      const metaAtualizada = await carregarMeta(meta.id, true);

      if (metaAtualizada) {
        meta = metaAtualizada;
      }

      router.push(`/minhas-metas/${meta.id}`);
    } else {
      // Mostrar Toast de Falha
      toast("Não foi possível atualizar esta Meta.", { type: "error" });
    }
  };

  return (
    <form
      className="mx-auto flex w-full max-w-2xl flex-col gap-2"
      onSubmit={handleSubmit(action)}
    >
      <Input label="Título*" {...register("titulo", { required: true })} />
      <Textarea label="Descrição" {...register("descricao")} />

      <GerenciarTarefas tarefas={tarefas} setTarefas={setTarefas} />
      <Button disabled={formState.isSubmitting} type="submit">
        Atualizar Meta
      </Button>
    </form>
  );
}
