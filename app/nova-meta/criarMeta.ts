"use server";
import { Prisma } from "@prisma/client";

export async function criarMeta(
  input: Prisma.MetaCreateInput
): Promise<"success" | "failure"> {
  // Criar meta

  return "success";
}
