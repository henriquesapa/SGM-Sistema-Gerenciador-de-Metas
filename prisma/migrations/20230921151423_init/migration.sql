/*
  Warnings:

  - You are about to drop the column `id_usuario` on the `Tarefa` table. All the data in the column will be lost.
  - You are about to drop the `key_results` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `objectives` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_usuario` to the `Meta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "key_results" DROP CONSTRAINT "key_results_objective_id_fkey";

-- AlterTable
ALTER TABLE "Meta" ADD COLUMN     "id_usuario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tarefa" DROP COLUMN "id_usuario";

-- DropTable
DROP TABLE "key_results";

-- DropTable
DROP TABLE "objectives";
