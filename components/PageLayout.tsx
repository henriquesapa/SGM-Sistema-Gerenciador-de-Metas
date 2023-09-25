import { HTMLAttributes, PropsWithChildren } from "react";

import { cnMerge } from "@/utils/cnMerge";

type Props = HTMLAttributes<HTMLDivElement>;

export function PageLayout({
  children,
  className,
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <main
      className={cnMerge(
        "container mx-auto flex w-full max-w-2xl flex-1 flex-col space-y-4 py-4 lg:pb-2",
        className
      )}
      {...rest}
    >
      {children}
    </main>
  );
}
