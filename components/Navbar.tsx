import { FC } from "react";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <nav className="fixed top-0 inset-x-0 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-black tracking-tight text-primary-500 hover:text-primary-400 transition-colors duration-100">
            Univerxities
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
