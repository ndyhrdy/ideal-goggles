import type { AppProps } from "next/app";
import { FC } from "react";
import DefaultView from "../components/DefaultView";
import "../styles/globals.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="font-sans text-gray-800">
      <DefaultView>
        <Component {...pageProps} />
      </DefaultView>
    </div>
  );
};

export default MyApp;
