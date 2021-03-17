import { FC, useEffect, useState } from "react";
import { Search } from "@styled-icons/feather";
import { useUniversities } from "./UniversitiesContext";
import { useRouter } from "next/router";

const UniversitiesSearch: FC = () => {
  const router = useRouter();
  const { searchTerm } = useUniversities();

  const [term, setTerm] = useState("");

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  return (
    <form
      action="/"
      method="get"
      className="w-full max-w-2xl"
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
          name="name"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          className="text-2xl pl-5 pr-16 h-14 rounded-md w-full bg-white bg-opacity-80 shadow-lg focus:ring-2 ring-primary-500 focus:bg-opacity-100 transition-colors duration-200 font-light"
          placeholder="Find your university here"
        />
        <div className="absolute right-0 inset-y-0 px-4 flex items-center text-gray-400">
          <Search strokeWidth={2} size={24} />
        </div>
      </div>
    </form>
  );
};

export default UniversitiesSearch;
