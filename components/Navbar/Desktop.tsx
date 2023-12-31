import { useAuth, UserButton } from "@clerk/nextjs";
import { LogIn, UserPlus } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/Button";

const Content = dynamic(
  () => import("./Content").then((mod) => mod.HeaderContent),
  {
    // loading: () => (
    //   <div className="hidden w-72 items-center justify-center lg:flex">
    //     <Spinner className="h-20 w-20" />
    //   </div>
    // ),
    ssr: false,
  }
);

export function HeaderDesktop() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 hidden h-20 w-full bg-white px-8 py-2 shadow-sm md:flex">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-bold text-primary-600 underline underline-offset-8">
          SGM
        </h1>
        <div className="flex items-center">
          <Content />
        </div>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div className="flex gap-2">
            <Link href="/entrar">
              <Button LeftIcon={LogIn}>Entrar</Button>
            </Link>
            <Link href="/cadastrar">
              <Button LeftIcon={UserPlus}>Cadastrar</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
