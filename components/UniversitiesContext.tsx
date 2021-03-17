import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import axios, { CancelTokenSource } from "axios";
import { searchUniversities } from "../lib/api";
import { University } from "../@types";

type Status = "pending" | "idle" | "fetching";

type Values = {
  error: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  status: Status;
  universities: University[];
};

const Context = createContext<Values>({
  error: null,
  searchTerm: "",
  setSearchTerm: () => {},
  status: "pending",
  universities: [],
});

const UniversitiesContextProvider: FC = ({ children }) => {
  const router = useRouter();
  const query = router.query;
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<Status>("pending");
  const [universities, setUniversities] = useState<University[]>([]);

  const handleFetch = useCallback(
    async (cancelToken: CancelTokenSource) => {
      setError(null);
      setStatus("fetching");
      try {
        setUniversities(
          await searchUniversities(
            { country: searchTerm ? null : "Indonesia", name: searchTerm },
            cancelToken
          )
        );
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error.response?.data.message || error.message || error);
        }
      }
      setStatus("idle");
    },
    [searchTerm]
  );

  useEffect(() => {
    const fetchCancelToken = axios.CancelToken.source();
    handleFetch(fetchCancelToken);
    return () => {
      fetchCancelToken.cancel("Request canceled");
    };
  }, [handleFetch]);

  useEffect(() => {
    if (query._q) {
      setSearchTerm(typeof query._q === "string" ? query._q : query._q[0]);
    } else {
      setSearchTerm("");
    }
    setStatus("idle");
  }, [query._q]);

  return (
    <Context.Provider
      value={{
        error,
        searchTerm,
        setSearchTerm,
        status,
        universities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default UniversitiesContextProvider;

export const useUniversities = () => useContext(Context);
