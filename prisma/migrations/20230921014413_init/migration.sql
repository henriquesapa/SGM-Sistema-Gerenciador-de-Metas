/*
  Warnings:

  - A unique constraint covering the columns `[id_usuario]` on the table `Historico` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_usuario` to the `Historico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Historico" ADD COLUMN     "id_usuario" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "Historico_id_usuario_key" ON "Historico"("id_usuario");

-- AddForeignKey
ALTER TABLE "Historico" ADD CONSTRAINT "Historico_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
