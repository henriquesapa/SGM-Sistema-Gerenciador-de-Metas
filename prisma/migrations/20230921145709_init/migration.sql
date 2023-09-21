/*
  Warnings:

  - You are about to drop the `Historico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fim` to the `Tarefa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `Tarefa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicio` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Historico" DROP CONSTRAINT "Historico_id_tarefa_fkey";

-- DropForeignKey
ALTER TABLE "Historico" DROP CONSTRAINT "Historico_id_usuario_fkey";

-- AlterTable
ALTER TABLE "Tarefa" ADD COLUMN     "fim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_usuario" TEXT NOT NULL,
ADD COLUMN     "inicio" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Historico";

-- DropTable
DROP TABLE "Usuario";
