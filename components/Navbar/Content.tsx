import { Home, ListChecks, PlusCircle } from "lucide-react";

import { HeaderItem } from "./Item";

export function HeaderContent() {
  const navigationItems: NavigationItem[] = [
    {
      label: "Inicio",
      href: "/",
      Icon: Home,
      exact: true,
    },
    {
      label: "Nova Meta",
      Icon: PlusCircle,
      href: "/nova-meta",
    },
    {
      label: "Minhas Metas",
      Icon: ListChecks,
      href: "/minhas-metas",
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
