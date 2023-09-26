import { PageLayout } from "@/components/PageLayout";

import { criarMeta } from "./criarMeta";
import { NovaMetaForm } from "./Form";

export default function Page(): JSX.Element {
  return (
    <PageLayout>
      <h1 className="text-center text-4xl text-primary-400">Nova Meta</h1>
      <NovaMetaForm criarMeta={criarMeta} />
    </PageLayout>
  );
}
