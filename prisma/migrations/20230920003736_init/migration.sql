-- CreateTable
CREATE TABLE "Meta" (
    "id_meta" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id_meta")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id_tarefa" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "id_meta" INTEGER NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id_tarefa")
);

-- CreateTable
CREATE TABLE "Historico" (
    "id_historico" SERIAL NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "id_tarefa" INTEGER NOT NULL,

    CONSTRAINT "Historico_pkey" PRIMARY KEY ("id_historico")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_id_meta_key" ON "Tarefa"("id_meta");

-- CreateIndex
CREATE UNIQUE INDEX "Historico_id_tarefa_key" ON "Historico"("id_tarefa");

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_id_meta_fkey" FOREIGN KEY ("id_meta") REFERENCES "Meta"("id_meta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historico" ADD CONSTRAINT "Historico_id_tarefa_fkey" FOREIGN KEY ("id_tarefa") REFERENCES "Tarefa"("id_tarefa") ON DELETE RESTRICT ON UPDATE CASCADE;
