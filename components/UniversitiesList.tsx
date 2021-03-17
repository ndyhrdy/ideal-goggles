import axios from "axios";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { searchUniversities } from "../lib/api";
import { University } from "../@types";

type Props = {
  searchTerm?: string;
};

const UniversitiesList: FC<Props> = ({ searchTerm }) => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<"idle" | "fetching">("idle");
  const [universities, setUniversities] = useState<University[]>([]);
  const fetchCancelToken = useRef(axios.CancelToken.source());

  const handleFetch = useCallback(async () => {
    setError(null);
    setStatus("fetching");
    try {
      setUniversities(
        await searchUniversities(
          { country: searchTerm ? null : "Indonesia", name: searchTerm },
          fetchCancelToken.current
        )
      );
    } catch (error) {
      if (!axios.isCancel(error)) {
        setError(error.response?.data.message || error.message || error);
      }
    }
    setStatus("idle");
  }, [searchTerm, fetchCancelToken]);

  useEffect(() => {
    handleFetch();
    return () => {
      fetchCancelToken.current?.cancel("Request canceled");
    };
  }, [handleFetch]);

  return <ul></ul>;
};

export default UniversitiesList;
