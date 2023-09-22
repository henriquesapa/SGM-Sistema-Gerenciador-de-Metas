"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function atualizarMeta(
  meta: Prisma.MetaUpdateInput
): Promise<"success" | "failure"> {
  // Atualizar meta
  if (!meta) {
    return "failure";
  }

  try {
    await prisma.meta.update({
      where: {
        id: meta.id as string,
      },
      data: {
        ...meta,
      },
    });
  } catch {
    return "failure";
  }

  return "success";
}
