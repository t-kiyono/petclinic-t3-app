import { type AppType } from "next/app";
import NextNProgress from "nextjs-progressbar";

import { api } from "~/utils/api";
import colors from "~/styles/colors";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress color={colors.green} options={{ showSpinner: false }}/>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
