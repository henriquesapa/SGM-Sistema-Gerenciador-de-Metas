-- CreateTable
CREATE TABLE "objectives" (
    "id" TEXT NOT NULL,

    CONSTRAINT "objectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_results" (
    "id" TEXT NOT NULL,
    "objective_id" TEXT NOT NULL,

    CONSTRAINT "key_results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "key_results" ADD CONSTRAINT "key_results_objective_id_fkey" FOREIGN KEY ("objective_id") REFERENCES "objectives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
