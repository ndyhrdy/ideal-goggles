import { FC } from "react";
import DefaultView from "../components/DefaultView";
import Head from "../components/Head";
import UniversitiesContextProvider from "../components/UniversitiesContext";
import UniversitiesList from "../components/UniversitiesList";
import UniversitiesSearch from "../components/UniversitiesSearch";

const Home: FC = () => {
  return (
    <DefaultView>
      <UniversitiesContextProvider>
        <Head title="Home" />
        <section className="bg-white py-8 lg:py-24">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <UniversitiesSearch />
          </div>
        </section>
        <UniversitiesList />
      </UniversitiesContextProvider>
    </DefaultView>
  );
};

export default Home;
