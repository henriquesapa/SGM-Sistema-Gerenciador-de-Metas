"use server";
import { Meta as PMeta, Tarefa } from "@prisma/client";

import { prisma } from "@/lib/prisma";

interface Meta extends PMeta {
  tarefas?: Tarefa[];
}

export async function carregarMeta(
  idMeta: string,
  comRelacoes: boolean = false
): Promise<Meta | undefined> {
  // Buscar e retornar meta
  if (!idMeta) {
    return undefined;
  }

  try {
    const meta = await prisma.meta.findUniqueOrThrow({
      where: {
        id: idMeta,
      },
      include: {
        tarefas: comRelacoes,
      },
    });

    return meta;
  } catch {
    return undefined;
  }
}
