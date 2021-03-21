import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useApp } from "../components/AppContext";
import { ListItem } from "../components/UniversitiesList";

const Favorites: FC = () => {
  const router = useRouter();
  const { user, loadingUser } = useApp();

  useEffect(() => {
    if (!user && !loadingUser) {
      router.push("/login");
    }
  }, [router, user, loadingUser]);

  if (!user) {
    return null;
  }

  return (
    <>
      <section>
        <div className="container mx-auto px-4 pt-16 pb-16">
          <h1 className="font-black tracking-tight text-3xl dark:text-white mb-8">
            Favorites
          </h1>

          {!user.favorites?.length && (
            <p className="text-gray-400">You have not added any favorites.</p>
          )}
          <ul className="flex flex-wrap -mx-2 items-stretch">
            {user.favorites?.map((uni) => {
              return <ListItem key={uni.name} item={uni} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Favorites;
