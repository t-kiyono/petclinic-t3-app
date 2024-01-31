import type { NextPage } from "next";
import { Dom } from "~/components/pages/home";
import { CommonMeta } from "~/components/templates/meta";

const Home: NextPage = () => {
  return (
    <>
      <CommonMeta />
      <Dom />
    </>
  );
};

export default Home;

