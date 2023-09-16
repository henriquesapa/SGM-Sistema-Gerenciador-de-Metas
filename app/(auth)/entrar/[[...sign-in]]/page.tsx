import { SignIn } from "@clerk/nextjs";

import { PageLayout } from "@/components/PageLayout";

export default function Page() {
  return (
    <PageLayout className="flex h-[calc(100vh-5rem)] items-center justify-center">
      <SignIn />
    </PageLayout>
  );
}
