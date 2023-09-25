import { carregarMeta } from "@/app/minhas-metas/[idMeta]/carregarMeta";
import { ListaTarefas } from "@/app/minhas-metas/[idMeta]/ListaTarefas";
import { PageLayout } from "@/components/PageLayout";

export default async function Page({ params }: { params: { idMeta: string } }) {
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
      <h1 className="text-center text-4xl text-primary-400">Minha Meta</h1>

      <div className="flex flex-col gap-1 text-justify text-lg">
        <h2 className="text-2xl font-bold text-primary-500">Informações</h2>
        <p>
          <b>Título</b>: {meta.titulo}
        </p>
        <p>
          <b>Descrição</b>: {meta.descricao}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-primary-500">Tarefas</h2>
        <ListaTarefas tarefas={meta?.tarefas} />
      </div>
    </PageLayout>
  );
}
