"use server";

import { Meta } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function carregarMetas(
  idUsuario: string,
  comRelacoes: boolean = false
): Promise<Meta[] | undefined> {
  // Buscar e retornar metas
  if (!idUsuario) {
    return undefined;
  }

  try {
    const metas = await prisma.meta.findMany({
      where: {
        id_usuario: idUsuario,
      },
      include: {
        tarefas: comRelacoes,
      },
    });

    return metas;
  } catch {
    return undefined;
  }
}
