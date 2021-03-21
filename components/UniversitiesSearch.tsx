import { FC, useEffect, useState } from "react";
import { MapPin, Search, X } from "@styled-icons/feather";
import { useUniversities } from "./UniversitiesContext";
import { useRouter } from "next/router";

const UniversitiesSearch: FC = () => {
  const router = useRouter();
  const { currentLocation, searchTerm } = useUniversities();

  const [term, setTerm] = useState("");

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  return (
    <form
      action="/"
      method="get"
      className="w-full max-w-3xl"
      id="universitySearchForm"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(term.trim().length ? `?_q=${term}` : "/", undefined, {
          shallow: true,
        });
      }}
    >
      <div className="relative">
        <input
          type="text"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          className="text-2xl pl-5 pr-16 h-14 rounded-md w-full dark:text-white bg-gray-50 dark:bg-gray-700 shadow-lg focus:ring-2 ring-primary-500 focus:bg-white dark:focus:bg-gray-900 transition-colors duration-200 font-light"
          placeholder="Find your university here..."
        />
        {searchTerm.trim().length ? (
          <button
            onClick={() => {
              router.push("/");
            }}
            className="absolute right-0 inset-y-0 px-4 flex items-center text-gray-400"
          >
            <X strokeWidth={2} size={24} />
          </button>
        ) : (
          <div className="absolute right-0 inset-y-0 px-4 flex items-center text-gray-400">
            <Search strokeWidth={2} size={24} />
          </div>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-400 space-x-4">
        {!!currentLocation && !searchTerm.trim().length && (
          <span>
            <MapPin strokeWidth={2} size={16} /> {currentLocation}
          </span>
        )}
        {term !== searchTerm && <span>Press [Enter] to search</span>}
      </div>
    </form>
  );
};

export default UniversitiesSearch;
