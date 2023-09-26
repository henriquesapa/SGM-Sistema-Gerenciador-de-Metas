"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function atualizarTarefa(
  tarefa: Prisma.TarefaUpdateInput
): Promise<"success" | "failure"> {
  // Atualizar tarefa
  if (!tarefa) {
    return "failure";
  }

  try {
    await prisma.tarefa.update({
      where: {
        id: tarefa.id as string,
      },
      data: {
        ...tarefa,
      },
    });
  } catch {
    return "failure";
  }

  return "success";
}
