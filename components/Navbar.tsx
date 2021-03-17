import { FC, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: FC = () => {
  const router = useRouter();

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
    <nav className="bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 h-24 flex justify-between items-center">
        <div className="h-full flex items-center">
          <Link href="/">
            <a className="text-2xl font-black tracking-tight text-primary-500 hover:text-primary-400 transition-colors duration-100">
              Univerxities
            </a>
          </Link>
          <ul className="ml-4 flex h-full items-stretch">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
