import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthenticatedUser, University } from "../@types";
import { me } from "../lib/api";

type Values = {
  dark: boolean;
  setDark: (dark: boolean) => void;
  user: AuthenticatedUser | null;
  login: (user: AuthenticatedUser) => void;
  logout: () => void;
  loadingUser: boolean;
  setFavorites: (favorites: University[]) => void;
};

const Context = createContext<Values>({
  dark: false,
  setDark: () => {},
  user: null,
  login: () => {},
  logout: () => {},
  loadingUser: true,
  setFavorites: () => {},
});

const AppContextProvider: FC = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<AuthenticatedUser>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("authToken");
  }, []);

  const handleSetFavorites = useCallback(
    (favorites: University[]) => {
      if (user) {
        setUser({ ...user, favorites });
      }
    },
    [user]
  );

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
    const handleFetchMe = async (token) => {
      try {
        const fetchedUser = await me(token);
        setUser({ ...fetchedUser, token });
      } catch (error) {
        handleLogout();
      }
      setLoadingUser(false);
    };
    const existingToken = localStorage.getItem("authToken");
    if (existingToken) {
      handleFetchMe(existingToken);
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
          setUser({
            email: user.email,
            fullName: user.fullName,
            token: user.token,
            favorites: user.favorites || [],
          });
          localStorage.setItem("authToken", user.token);
        },
        logout: handleLogout,
        loadingUser,
        setFavorites: handleSetFavorites,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContextProvider;

export const useApp = () => useContext(Context);
