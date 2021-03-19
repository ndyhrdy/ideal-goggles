import { FC } from "react";
import Head from "../components/Head";
import UniversitiesContextProvider from "../components/UniversitiesContext";
import UniversitiesList from "../components/UniversitiesList";
import UniversitiesSearch from "../components/UniversitiesSearch";

const Home: FC = () => {
  return (
    <>
      <UniversitiesContextProvider>
        <Head title="Home" />
        <section className="bg-white dark:bg-gray-800 py-8 lg:py-24">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <UniversitiesSearch />
          </div>
        </section>
        <UniversitiesList />
      </UniversitiesContextProvider>
    </>
  );
};

export default Home;
