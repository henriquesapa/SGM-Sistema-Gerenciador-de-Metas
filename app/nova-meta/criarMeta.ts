"use server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function criarMeta(
  meta: Prisma.MetaCreateInput
): Promise<"success" | "failure"> {
  // Criar meta
  if (!meta) {
    return "failure";
  }

  try {
    await prisma.meta.create({
      data: {
        ...meta,
      },
    });
  } catch {
    return "failure";
  }

  return "success";
}
