import { PropsWithChildren } from "react";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

import { Navbar } from "@/components/Navbar";
import { NavbarProvider } from "@/contexts/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sistema Gerenciador de Metas",
    template: "%s | Sistema Gerenciador de Metas",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className="min-h-screen bg-background">
          <NavbarProvider>
            <Navbar />
            {children}
          </NavbarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
