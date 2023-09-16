"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useNavbar } from "@/contexts/Navbar";
import { cnMerge } from "@/utils/cnMerge";
import { routeIsActive } from "@/utils/route";

type Props = {
  link: NavigationItem;
};

export function HeaderItem({ link }: Props) {
  const pathname = usePathname();
  const { closeNavbar } = useNavbar();

  return (
    <Link
      href={link.href || "#"}
      className={cnMerge(
        "flex h-10 items-center px-1 font-medium hover:text-gray-800",
        {
          "text-gray-800 underline decoration-primary decoration-2 underline-offset-4":
            routeIsActive(pathname ?? "", link),
        }
      )}
      onClick={closeNavbar}
    >
      {link.Icon ? (
        <link.Icon
          className={cnMerge("h-4 w-4", {
            "text-primary": routeIsActive(pathname ?? "", link),
          })}
          aria-hidden="true"
        />
      ) : null}
      <span
        className={cnMerge({
          "ml-[1.625rem]": !link.Icon,
          "ml-2": !!link.Icon,
        })}
      >
        {link.label}
      </span>
    </Link>
  );
}
