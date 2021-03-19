import { AnimatePresence, motion } from "framer-motion";
import { FC, useMemo, useState } from "react";
import { Menu } from "@styled-icons/feather";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  fixed: boolean;
};

const Navbar: FC<Props> = ({ fixed }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const links = useMemo(() => {
    return [
      { to: "/", label: "Search", active: router.pathname === "/" },
      {
        to: "/newsletter",
        label: "Newsletter",
        active: router.pathname === "/newsletter",
      },
    ];
  }, [router.pathname]);

  return (
    <nav
      className={`bg-white dark:bg-gray-800 ${
        fixed ? "fixed top-0 inset-x-0 shadow-lg z-10" : ""
      }`}
    >
      <div
        className={`container mx-auto px-4 h-16 flex justify-between items-center ${
          !fixed ? "lg:h-24" : ""
        }`}
      >
        <div className="h-full w-full flex items-center justify-between lg:justify-start">
          <Link href="/">
            <a className="text-2xl font-black tracking-tight text-primary-500 hover:text-primary-400 transition-colors duration-100">
              Univerxities
            </a>
          </Link>
          <ul className="ml-4 hidden h-full items-stretch lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <Link href={link.to}>
                  <a
                    className={`flex h-full items-center px-4 border-b-4 pt-1 transition-colors duration-100 ${
                      link.active
                        ? "text-primary-600 border-primary-500 hover:bg-primary-50"
                        : "text-gray-400 border-transparent hover:bg-gray-100 hover:text-gray-500 "
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          {!showMenu && (
            <button
              type="button"
              className="h-full px-4 -mr-4 lg:hidden"
              onClick={() => {
                setShowMenu(true);
              }}
            >
              <Menu strokeWidth={2} size={24} />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-black bg-opacity-80"
            variants={{
              out: {
                opacity: 0,
                transition: { ease: "easeIn", duration: 0.3 },
              },
              in: {
                opacity: 1,
                transition: { ease: "easeOut", duration: 0.3 },
              },
            }}
            initial="out"
            animate="in"
            exit="out"
            onClick={() => {
              setShowMenu(false);
            }}
          >
            <motion.div
              key="container"
              className="w-80 max-w-full bg-white h-full py-24"
              variants={{
                out: {
                  x: -320,
                  transition: { duration: 0.5 },
                },
                in: {
                  x: 0,
                  transition: { ease: "circOut", duration: 0.5 },
                },
              }}
              initial="out"
              animate="in"
              exit="out"
            >
              <ul className="flex flex-col items-stretch">
                {links.map((link) => {
                  return (
                    <li key={link.to}>
                      <Link href={link.to}>
                        <a
                          className={`block px-6 py-2 text-xl tracking-tight border-r-4 ${
                            link.active
                              ? "border-primary-500 text-primary-500"
                              : "border-transparent text-gray-400"
                          }`}
                        >
                          {link.label}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
