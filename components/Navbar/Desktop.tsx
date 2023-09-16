import dynamic from "next/dynamic";

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
	return (
		<header className="sticky top-0 z-50 hidden h-20 w-full bg-white px-8 py-2 shadow-sm md:flex">
			<div className="container flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<h1>SGM</h1>
					<Content />
				</div>
			</div>
		</header>
	);
}
