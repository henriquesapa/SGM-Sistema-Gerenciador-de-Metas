"use server";

import { Prisma } from "@prisma/client";

export async function atualizarMeta(
  meta: Prisma.MetaUpdateInput
): Promise<"success" | "failure"> {
  return "success";
}
