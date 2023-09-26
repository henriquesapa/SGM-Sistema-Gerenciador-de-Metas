import { PropsWithChildren, ReactElement } from "react";
import { ToastContainer } from "react-toastify";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

import { Navbar } from "@/components/Navbar";
import { NavbarProvider } from "@/contexts/Navbar";

import "react-toastify/dist/ReactToastify.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sistema Gerenciador de Metas",
    template: "%s | Sistema Gerenciador de Metas",
  },
};

export default function RootLayout({
  children,
}: PropsWithChildren): ReactElement | null {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className="min-h-screen bg-background">
          <NavbarProvider>
            <Navbar />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {children}
          </NavbarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
