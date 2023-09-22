import { PageLayout } from "@/components/PageLayout";

export default async function Page({ params }: { params: { idMeta: string } }) {
  return <PageLayout>Exibir Meta {params.idMeta}</PageLayout>;
}
