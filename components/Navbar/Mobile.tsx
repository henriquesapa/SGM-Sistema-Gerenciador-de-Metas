"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { LogIn, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/Button";
import { useNavbar } from "@/contexts/Navbar";

const Content = dynamic(
  () => import("./Content").then((mod) => mod.HeaderContent),
  {
    // loading: () => (
    //   <div className="hidden w-full items-center justify-center lg:flex">
    //     <Spinner className="h-20 w-20" />
    //   </div>
    // ),
    ssr: false,
  }
);

export function HeaderMobile() {
  const { isNavbarOpen, toggleIsNavbarOpen } = useNavbar();
  const { isSignedIn } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 flex h-20 items-center justify-between bg-white px-4 py-2 shadow-sm md:hidden">
        <div className="flex w-full items-center justify-between">
          <Button
            className="bg-transparent text-primary focus:bg-transparent enabled:hover:bg-transparent"
            iconClassName="h-6 w-6"
            LeftIcon={isNavbarOpen ? X : Menu}
            onClick={toggleIsNavbarOpen}
          />
          <h1 className="text-4xl font-bold text-primary underline underline-offset-8">
            SGM
          </h1>

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/entrar">
              <Button LeftIcon={LogIn}>Entrar</Button>
            </Link>
          )}
        </div>
      </header>
      <AnimatePresence mode="wait">
        {isNavbarOpen ? (
          <LazyMotion
            features={() =>
              import("@/utils/motionFeatures").then((res) => res.default)
            }
          >
            <m.aside
              key="nav-aside"
              className="fixed inset-0 z-50 mt-20 flex w-full flex-shrink-0 flex-col gap-y-7 overflow-y-auto bg-white py-2.5 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                ease: "easeInOut",
              }}
            >
              <Content />
            </m.aside>
          </LazyMotion>
        ) : null}
      </AnimatePresence>
    </>
  );
}
