"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";

type Props = {
  criarMeta(meta: Prisma.MetaCreateInput): Promise<"success" | "failure">;
};

export function NovaMetaForm({ criarMeta }: Props) {
  const { userId } = useAuth();
  const { formState, handleSubmit, register } =
    useForm<Prisma.MetaCreateInput>();

  const action: SubmitHandler<Prisma.MetaCreateInput> = async (data) => {
    const resultadoCriarMeta = await criarMeta({
      ...data,
      id_usuario: userId,
    });

    if (resultadoCriarMeta === "success") {
      // Mostrar Toast de Sucesso
    } else {
      // Mostrar Toast de Falha
    }
  };

  return (
    <form
      className="mx-auto flex w-full max-w-2xl flex-col gap-2"
      onSubmit={handleSubmit(action)}
    >
      <Input label="Título" {...register("titulo")} />
      <Textarea label="Descrição" {...register("descricao")} />
      <Button disabled={formState.isSubmitting} type="submit">
        Criar Meta
      </Button>
    </form>
  );
}
