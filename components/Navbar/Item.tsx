"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useHeader } from "@/contexts/Header";
import { cnMerge } from "@/utils/cnMerge";
import { routeIsActive } from "@/utils/route";

type Props = {
	link: NavigationItem;
};

export function HeaderItem({ link }: Props) {
	const pathname = usePathname();
	const { closeHeader } = useHeader();

	return (
		<Link
			href={link.href || "#"}
			className={cnMerge(
				"flex h-10 w-full items-center px-1 font-medium hover:text-gray-800",
				{
					"text-gray-800 underline decoration-primary decoration-2 underline-offset-4":
						routeIsActive(pathname ?? "", link),
				}
			)}
			onClick={closeHeader}
		>
			{link.Icon ? <link.Icon className="h-4 w-4" aria-hidden="true" /> : null}
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
