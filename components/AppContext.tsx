import { createContext, FC, useContext, useEffect, useState } from "react";

type Values = {
  dark: boolean;
  setDark: (dark: boolean) => void;
};

const Context = createContext<Values>({ dark: false, setDark: () => {} });

const AppContextProvider: FC = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const windowMediaHandler = (ev: MediaQueryListEvent) => {
      setDark(ev.matches);
    };
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", windowMediaHandler);
    setDark(mediaQuery.matches);
    () => {
      mediaQuery.removeEventListener("change", windowMediaHandler);
    };
  }, []);

  return (
    <Context.Provider value={{ dark, setDark }}>{children}</Context.Provider>
  );
};

export default AppContextProvider;

export const useApp = () => useContext(Context);
