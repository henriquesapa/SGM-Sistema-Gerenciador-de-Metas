"use client";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

import Logo from "@/assets/logo.png";
import { Button } from "@/components/Button";
import { useHeader } from "@/contexts/Header";

const Content = dynamic(
	() => import("@/components/Header/Content").then((mod) => mod.HeaderContent),
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
	const { isHeaderOpen, toggleHeader } = useHeader();

	return (
		<>
			<header className="sticky top-0 z-50 flex h-20 items-center justify-between bg-white px-4 py-2 shadow-sm md:hidden">
				<div className="relative flex w-full">
					<Button
						className="bg-transparent text-primary focus:bg-transparent enabled:hover:bg-transparent"
						iconClassName="h-6 w-6"
						LeftIcon={isHeaderOpen ? X : Menu}
						onClick={toggleHeader}
					/>
					<Image
						alt=""
						className="absolute left-1/2 h-full w-auto -translate-x-1/2 transform"
						src={Logo}
					/>
				</div>
			</header>
			<AnimatePresence mode="wait">
				{isHeaderOpen ? (
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
