import { HTMLAttributes, PropsWithChildren } from "react";

import { cnMerge } from "@/src/utils/cnMerge";

type Props = HTMLAttributes<HTMLDivElement>;

export function PageLayout({
  children,
  className,
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <main
      className={cnMerge(
        "container mx-auto flex flex-1 flex-col space-y-4 py-4 lg:pb-0",
        className
      )}
      {...rest}
    >
      {children}
    </main>
  );
}
