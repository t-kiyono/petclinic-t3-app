import { type AppType } from "next/app";
import NextNProgress from "nextjs-progressbar";

import { api } from "~/utils/api";
import colors from "~/styles/colors";

import "~/styles/globals.css";

import { Varela_Round, Montserrat } from "next/font/google";

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        body,
        h1,
        h2,
        h3,
        p,
        input {
          font-family: ${varelaRound.style.fontFamily}, sans-serif;
        }
        
        h2 {
          font-family: ${montserrat.style.fontFamily}, sans-serif;
        }
        
        li {
          font-family: ${montserrat.style.fontFamily}, sans-serif;
        }
      `}</style>
      <NextNProgress color={colors.green} options={{ showSpinner: false }}/>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
