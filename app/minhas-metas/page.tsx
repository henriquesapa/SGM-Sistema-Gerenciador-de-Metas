import { ReactElement } from "react";
import { auth } from "@clerk/nextjs";
import { AlertTriangle, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

import { carregarMetas } from "@/app/minhas-metas/carregarMetas";
import { Button } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";

export default async function Page(): Promise<ReactElement | null> {
  const { userId } = auth();
  const metas = await carregarMetas(userId);

  return (
    <PageLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-center text-4xl text-primary-400">Minhas Metas</h1>
        <Link href={`/nova-meta`}>
          <Button LeftIcon={Plus}>Nova Meta</Button>
        </Link>
      </div>

      {metas && metas.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {metas.map((meta) => (
            <Link
              className="group transition-all duration-300 hover:opacity-75"
              key={meta.id}
              href={`/minhas-metas/${meta.id}`}
            >
              <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-primary-600 p-3 transition-all duration-300 group-hover:bg-primary-600">
                <div className="flex flex-col gap-2">
                  <h3 className="line-clamp-1 text-xl font-semibold text-primary-500 transition-all duration-300 group-hover:text-primary-50">
                    {meta.titulo}
                  </h3>
                  <span className="line-clamp-2 transition-all duration-300 group-hover:text-white">
                    {meta.descricao}
                  </span>
                </div>
                <ArrowRight className="min-h-[1.75rem] min-w-[1.75rem] text-primary-600 transition-all duration-300 group-hover:text-primary-50" />
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <AlertTriangle className="min-h-[2.5rem] min-w-[2.5rem] text-orange-400" />
          <p className="text-xl font-medium">Não há Metas cadastradas</p>
        </div>
      )}
    </PageLayout>
  );
}
