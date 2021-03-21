import { AnimatePresence, motion } from "framer-motion";
import { FC, useMemo, useState } from "react";
import { Github, Menu, Moon, Sun } from "@styled-icons/feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { useApp } from "./AppContext";

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
        to: "/favorites",
        label: "Favorites",
        active: router.pathname === "/favorites",
      },
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
        <div className="h-full w-full flex items-center justify-start">
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
                        ? "text-primary-600 border-primary-500"
                        : "text-gray-400 border-transparent hover:text-gray-500 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <DarkSwitcher />
          <a
            href="https://github.com/ndyhrdy/ideal-goggles"
            className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Github strokeWidth={2} size={24} />
          </a>
          <AccountMenu />
          {!showMenu && (
            <button
              type="button"
              className="h-full -mr-4 lg:hidden dark:text-gray-300"
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
              className="w-80 max-w-full bg-white dark:bg-gray-900 h-full py-24"
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
              <ul className="flex flex-col items-stretch border-b pb-4 mb-4 dark:border-gray-700">
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
              <div className="px-6">
                <AccountMenu sidebar />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DarkSwitcher: FC = () => {
  const { dark, setDark } = useApp();

  return (
    <div className="flex items-center text-gray-400 group">
      <span className="hidden lg:flex">
        <Sun
          strokeWidth={2}
          size={20}
          className={!dark ? "text-yellow-500" : ""}
        />
      </span>
      <button
        type="button"
        onClick={() => {
          setDark(!dark);
        }}
        className="border-2 border-gray-400 hover:border-gray-600 dark:hover:border-gray-300 w-10 h-6 rounded-full flex items-center justify-center mx-2 group"
      >
        <span
          className={`h-4 w-4 rounded-full bg-gray-400 group-hover:bg-gray-600 dark:group-hover:bg-gray-300 transition-transform duration-200 transform ${
            dark ? "translate-x-2" : "-translate-x-2"
          }`}
        ></span>
      </button>
      <Moon strokeWidth={2} size={20} className={dark ? "text-white" : ""} />
    </div>
  );
};

const AccountMenu: FC<{ sidebar?: boolean }> = ({ sidebar = false }) => {
  const router = useRouter();
  const { user, logout, loadingUser } = useApp();

  if (loadingUser) {
    return null;
  }

  if (user) {
    return (
      <button
        type="button"
        onClick={logout}
        className={`${
          sidebar ? "" : "hidden lg:flex"
        } flex-col items-start text-left text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 group leading-tight whitespace-nowrap`}
      >
        {user.fullName}
        <div className="text-xs dark:text-gray-500 dark:group-hover:text-gray-300">
          {sidebar ? "Tap here" : "Click"} to log out
        </div>
      </button>
    );
  }

  if (sidebar) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/login">
          <a className="block py-2 text-xl tracking-tight text-gray-400">
            Log In
          </a>
        </Link>
        <span className="text-gray-300 dark:text-gray-500">/</span>
        <Link href="/register">
          <a className="block py-2 text-xl tracking-tight text-gray-400">
            Sign Up
          </a>
        </Link>
      </div>
    );
  }

  return (
    <>
      {router.pathname !== "/login" && (
        <Link href="/login">
          <a className="hidden lg:flex text-gray-400 dark:hover:text-white hover:text-gray-600 whitespace-nowrap">
            Log In
          </a>
        </Link>
      )}
      {router.pathname !== "/register" && (
        <Link href="/register">
          <a className="hidden lg:flex bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 text-white px-4 items-center h-10 rounded-md whitespace-nowrap shadow">
            Sign Up
          </a>
        </Link>
      )}
    </>
  );
};

export default Navbar;
