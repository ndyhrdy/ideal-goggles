import type { AppProps } from "next/app";
import { FC } from "react";
import "../styles/globals.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="font-sans text-gray-800">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
