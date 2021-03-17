import { FC } from "react";
import Navbar from "./Navbar";

const DefaultView: FC = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <Navbar />
      {children}
    </div>
  );
};

export default DefaultView;
