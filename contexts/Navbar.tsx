"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface ContextProps {
  isNavbarOpen: boolean;
  closeNavbar(): void;
  toggleIsNavbarOpen(): void;
}

export const NavbarContext = createContext<ContextProps>({
  isNavbarOpen: false,
  closeNavbar: () => {},
  toggleIsNavbarOpen: () => {},
});

export const NavbarProvider = ({ children }: PropsWithChildren) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  function toggleIsNavbarOpen() {
    setIsNavbarOpen((prevState) => !prevState);
  }

  function closeNavbar() {
    setIsNavbarOpen(false);
  }

  const context = useMemo(
    () => ({
      isNavbarOpen,
      toggleIsNavbarOpen,
      closeNavbar,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNavbarOpen]
  );

  return (
    <NavbarContext.Provider value={context}>{children}</NavbarContext.Provider>
  );
};

export const useNavbar = (): ContextProps => useContext(NavbarContext);
