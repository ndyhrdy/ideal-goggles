import { AppProps } from "next/dist/next-server/lib/router/router";
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
