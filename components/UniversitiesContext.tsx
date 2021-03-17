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
  currentLocation: null | string;
  error: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  status: Status;
  universities: University[];
};

const Context = createContext<Values>({
  currentLocation: null,
  error: null,
  searchTerm: "",
  setSearchTerm: () => {},
  status: "pending",
  universities: [],
});

const UniversitiesContextProvider: FC = ({ children }) => {
  const router = useRouter();
  const query = router.query;
  const [currentLocation, setCurrentLocation] = useState<string>(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<Status>("pending");
  const [universities, setUniversities] = useState<University[]>([]);

  const handleFetch = useCallback(
    async (cancelToken: CancelTokenSource) => {
      setError(null);
      setStatus("fetching");
      const searchingByName = !!searchTerm.trim().length;
      try {
        setUniversities(
          await searchUniversities(
            searchingByName
              ? {
                  name: searchTerm,
                }
              : {
                  country: currentLocation || "Indonesia",
                },
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
    [searchTerm, currentLocation]
  );

  useEffect(() => {
    if (query._q) {
      setSearchTerm(typeof query._q === "string" ? query._q : query._q[0]);
    } else {
      setSearchTerm("");
    }
    setStatus("idle");
  }, [query._q]);

  useEffect(() => {
    const fetchCancelToken = axios.CancelToken.source();
    handleFetch(fetchCancelToken);
    return () => {
      fetchCancelToken.cancel("Request canceled");
    };
  }, [handleFetch]);

  useEffect(() => {
    const reverseGeocode: PositionCallback = async ({ coords }) => {
      const { data: geocodedResult } = await axios.get<{ countryName: string }>(
        "https://api.bigdatacloud.net/data/reverse-geocode-client",
        {
          params: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        }
      );
      setCurrentLocation(geocodedResult.countryName);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(reverseGeocode);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        currentLocation,
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
