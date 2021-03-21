import { FC, useCallback, useState } from "react";
import { Heart } from "@styled-icons/boxicons-regular";
import { Heart as HeartFull } from "@styled-icons/boxicons-solid";
import { University } from "../@types";
import { useApp } from "./AppContext";
import { useUniversities } from "./UniversitiesContext";
import Alert from "./Alert";
import { favorite } from "../lib/api";

const UniversitiesList: FC = () => {
  const { error, universities, status } = useUniversities();

  return (
    <section>
      <div className="container mx-auto pt-16 pb-16 px-4">
        {status === "fetching" && <Alert>Getting universities...</Alert>}
        {!!error && <Alert>{error}</Alert>}

        <ul className="flex flex-wrap -mx-2 items-stretch">
          {universities.map((university) =>
            university.web_pages?.length > 0 ? (
              <ListItem key={university.name} item={university} />
            ) : null
          )}
        </ul>
      </div>
    </section>
  );
};

type ListItemProps = {
  item: University;
};

const ListItem: FC<ListItemProps> = ({ item }) => {
  const { user, setFavorites } = useApp();
  const [status, setStatus] = useState<"idle" | "busy">("idle");

  const isFavorite = user?.favorites?.includes(item.name);

  const handleFavorite = useCallback(async () => {
    if (!user || status !== "idle") {
      return Promise.resolve();
    }
    setStatus("busy");
    try {
      const newUserData = await favorite(item.name, user.token);
      setFavorites(newUserData.favorites || []);
    } catch (error) {
      console.log("Failed to (un)favorite university");
    }
    setStatus("idle");
  }, [item.name, status, user]);

  return (
    <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-2 mb-4">
      <div className="flex flex-col justify-between h-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-shadow hover:shadow duration-200">
        <div className="p-4">
          <a href={item.web_pages[0]} target="_blank">
            <h3 className="font-bold leading-tight tracking-tight dark:text-white hover:text-primary-500 dark:hover:text-primary-500 transition-colors duration-200">
              {item.name}
            </h3>
          </a>
          <p className="text-gray-400">{item.country}</p>
        </div>
        <div className="p-4 flex items-end justify-between">
          <div className="text-gray-500 text-sm">
            {item.domains?.slice(0, 1)}
          </div>
          {!!user && (
            <button
              type="button"
              disabled={status !== "idle"}
              onClick={handleFavorite}
              className={
                isFavorite
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }
            >
              {isFavorite ? <HeartFull size={20} /> : <Heart size={20} />}
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default UniversitiesList;
