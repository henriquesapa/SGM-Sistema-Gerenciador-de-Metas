import { Meta, Prisma } from "@prisma/client";
import { render, screen, within } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import { describe, expect, test, vi } from "vitest";

import { criarMeta } from "@/app/nova-meta/criarMeta";
import prisma from "@/lib/__mocks__/prisma";

import NovaMeta from "./page";

describe("Página de Nova Meta", () => {
  vi.mock("next/navigation", () => {
    const actual = vi.importActual("next/navigation");
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        push: vi.fn(),
      })),
      useSearchParams: vi.fn(() => ({
        get: vi.fn(),
      })),
      usePathname: vi.fn(),
    };
  });

  render(<NovaMeta />);
  const main = within(screen.getByRole("main"));

  test("Autenticado: Formulário deve aparecer", () => {
    vi.mock("@clerk/nextjs", () => {
      return {
        auth: () => new Promise((resolve) => resolve({ userId: "fefsfehrf" })),
        ClerkProvider: ({ children }) => <div>{children}</div>,
        useAuth: () => ({
          isSignedIn: true,
          user: {
            id: "user_8JkL2mP0zX6d8JkL2mP0zX6dJ",
            fullName: "Thrall Durotan",
          },
        }),
      };
    });

    expect(main.getByTestId("NovaMetaForm")).toBeDefined();
  });

  test("Não Autenticado: Formulário NÃO deve aparecer", () => {
    vi.mock("@clerk/nextjs", () => {
      return {
        auth: () => new Promise((resolve) => resolve(null)),
        ClerkProvider: ({ children }) => <div>{children}</div>,
        useAuth: () => ({
          isSignedIn: false,
          user: null,
        }),
      };
    });

    expect(!main.getByTestId("NovaMetaForm")).toBeDefined();
  });

  test("Autenticado: Deve criar nova Meta sem Tarefas", async () => {
    vi.mock("@clerk/nextjs", () => {
      return {
        auth: () => new Promise((resolve) => resolve({ userId: "fefsfehrf" })),
        ClerkProvider: ({ children }) => <div>{children}</div>,
        useAuth: () => ({
          isSignedIn: true,
          user: {
            id: "user_8JkL2mP0zX6d8JkL2mP0zX6dJ",
            fullName: "Thrall Durotan",
          },
        }),
      };
    });

    const novaMeta: Prisma.MetaCreateInput = {
      id: uuidv4(),
      titulo: "Uma Meta de Teste",
      id_usuario: "user_8JkL2mP0zX6d8JkL2mP0zX6dJ",
    };

    prisma.meta.create.mockResolvedValue(novaMeta);

    const resultadoCriarMeta = await criarMeta(novaMeta);

    expect(resultadoCriarMeta).toStrictEqual("success");
  });

  test("Autenticado: NÃO deve criar nova Meta sem passar os dados da Meta", async () => {
    vi.mock("@clerk/nextjs", () => {
      return {
        auth: () => new Promise((resolve) => resolve({ userId: "fefsfehrf" })),
        ClerkProvider: ({ children }) => <div>{children}</div>,
        useAuth: () => ({
          isSignedIn: true,
          user: {
            id: "user_8JkL2mP0zX6d8JkL2mP0zX6dJ",
            fullName: "Thrall Durotan",
          },
        }),
      };
    });

    prisma.meta.create.mockResolvedValue({} as Meta);

    const resultadoCriarMeta = await criarMeta({} as Meta);

    expect(resultadoCriarMeta).toStrictEqual("failure");
  });
});
