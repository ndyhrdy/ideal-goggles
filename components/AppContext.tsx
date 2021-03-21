import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthenticatedUser, User } from "../@types";
import { me } from "../lib/api";

type Values = {
  dark: boolean;
  setDark: (dark: boolean) => void;
  user: User | null;
  login: (user: AuthenticatedUser) => void;
  logout: () => void;
  loadingUser: boolean;
};

const Context = createContext<Values>({
  dark: false,
  setDark: () => {},
  user: null,
  login: () => {},
  logout: () => {},
  loadingUser: true,
});

const AppContextProvider: FC = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<User>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("authToken");
  }, []);

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

  useEffect(() => {
    const handleFetchMe = async () => {
      try {
        const user = await me(existingToken);
        setUser(user);
      } catch (error) {
        handleLogout();
      }
      setLoadingUser(false);
    };
    const existingToken = localStorage.getItem("authToken");
    if (existingToken) {
      handleFetchMe();
    } else {
      setLoadingUser(false);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        dark,
        setDark,
        user,
        login: (user) => {
          setUser({ email: user.email, fullName: user.fullName });
          localStorage.setItem("authToken", user.token);
        },
        logout: handleLogout,
        loadingUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContextProvider;

export const useApp = () => useContext(Context);
