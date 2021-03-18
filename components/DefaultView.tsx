import { FC, useEffect, useState } from "react";
import Navbar from "./Navbar";

const DefaultView: FC = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleWindowScroll);
    handleWindowScroll();
    () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${
        scrolled ? "pt-16 lg:pt-24" : ""
      }`}
    >
      <Navbar fixed={scrolled} />
      {children}
    </div>
  );
};

export default DefaultView;
