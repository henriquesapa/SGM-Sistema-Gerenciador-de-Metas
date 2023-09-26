"use client";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";
import { Prisma, Tarefa } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { GerenciarTarefas } from "@/components/GerenciarTarefas";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";

type Props = {
  criarMeta(meta: Prisma.MetaCreateInput): Promise<"success" | "failure">;
};

export function NovaMetaForm({ criarMeta }: Props): ReactElement | null {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const { userId } = useAuth();
  const { formState, handleSubmit, register, reset } =
    useForm<Prisma.MetaCreateInput>();
  const router = useRouter();

  const action: SubmitHandler<Prisma.MetaCreateInput> = async (data) => {
    const resultadoCriarMeta = await criarMeta({
      ...data,
      id_usuario: userId,
      tarefas: {
        createMany: {
          data: tarefas,
        },
      },
    });

    if (resultadoCriarMeta === "success") {
      // Mostrar Toast de Sucesso
      toast("Meta Criada!", { type: "success" });

      reset();
      router.push("/minhas-metas");
    } else {
      // Mostrar Toast de Falha
      toast("Não foi possível criar esta Meta.", { type: "error" });
    }
  };

  return (
    <form
      className="mx-auto flex w-full max-w-2xl flex-col gap-2"
      data-testid="NovaMetaForm"
      onSubmit={handleSubmit(action)}
    >
      <Input label="Título*" {...register("titulo", { required: true })} />
      <Textarea label="Descrição" {...register("descricao")} />

      <GerenciarTarefas tarefas={tarefas} setTarefas={setTarefas} />
      <Button disabled={formState.isSubmitting} type="submit">
        Criar Meta
      </Button>
    </form>
  );
}
