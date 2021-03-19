import { FC } from "react";
import { University } from "../@types";
import { useUniversities } from "./UniversitiesContext";
import Alert from "./Alert";

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
  return (
    <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-2 mb-4">
      <a
        href={item.web_pages[0]}
        target="_blank"
        className="flex flex-col justify-between h-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-shadow hover:shadow focus:ring-2 ring-primary-500 duration-200 group"
      >
        <div className="p-4">
          <h3 className="font-bold leading-tight tracking-tight dark:text-white group-hover:text-primary-500 transition-colors duration-200">
            {item.name}
          </h3>
          <p className="text-gray-400">{item.country}</p>
        </div>
        <div className="p-4 text-gray-500 text-sm">
          {item.domains?.slice(0, 1)}
        </div>
      </a>
    </li>
  );
};

export default UniversitiesList;
