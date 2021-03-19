import type { AppProps } from "next/app";
import { FC } from "react";
import AppContextProvider from "../components/AppContext";
import DefaultView from "../components/DefaultView";
import "../styles/globals.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="font-sans text-gray-800">
      <AppContextProvider>
        <DefaultView>
          <Component {...pageProps} />
        </DefaultView>
      </AppContextProvider>
    </div>
  );
};

export default MyApp;
