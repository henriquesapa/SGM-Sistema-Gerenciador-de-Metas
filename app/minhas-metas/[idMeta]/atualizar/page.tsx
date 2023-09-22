import { PageLayout } from "@/components/PageLayout";

export default async function Page({ params }: { params: { idMeta: string } }) {
  return <PageLayout>Atualizar Meta {params.idMeta}</PageLayout>;
}
