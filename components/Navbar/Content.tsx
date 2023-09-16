import { HeaderItem } from "./Item";

export function HeaderContent() {
	const navigationItems: NavigationItem[] = [
		{
			label: "Inicio",
			href: "/",
			exact: true,
		},
		{
			label: "Serviços",
			href: "/servicos",
		},
		{
			label: "Sobre",
			href: "/sobre",
		},
		{
			label: "Blog",
			href: "/blog",
		},
	];

	return (
		<nav className="flex flex-col gap-4 text-gray-500 md:flex-row">
			{navigationItems.map((link) => (
				<HeaderItem key={link.label} link={link} />
			))}
		</nav>
	);
}
