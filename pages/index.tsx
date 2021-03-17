import { FC } from "react";
import { useRouter } from "next/router";
import DefaultView from "../components/DefaultView";
import Head from "../components/Head";
import UniversitiesList from "../components/UniversitiesList";

const Home: FC = () => {
  const router = useRouter();
  const query = router.query;

  return (
    <DefaultView>
      <Head title="Home" />
      <UniversitiesList
        searchTerm={
          typeof query._q === "string" ? query._q : query._q?.[0] || undefined
        }
      />
    </DefaultView>
  );
};

export default Home;
