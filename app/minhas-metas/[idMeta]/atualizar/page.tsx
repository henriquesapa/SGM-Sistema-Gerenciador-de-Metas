import { ReactElement } from "react";

import { carregarMeta } from "@/app/minhas-metas/[idMeta]/carregarMeta";
import { PageLayout } from "@/components/PageLayout";

import { atualizarMeta } from "./atualizarMeta";
import { AtualizarMetaForm } from "./Form";

export default async function Page({
  params,
}: {
  params: { idMeta: string };
}): Promise<ReactElement | null> {
  const meta = await carregarMeta(params.idMeta, true);

  if (!meta) {
    return (
      <PageLayout>
        <h1>Meta Não Encontrada</h1>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <h1 className="text-center text-4xl text-primary-400">Atualizar Meta</h1>
      <AtualizarMetaForm
        atualizarMeta={atualizarMeta}
        carregarMeta={carregarMeta}
        meta={meta}
      />
    </PageLayout>
  );
}
