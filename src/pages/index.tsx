import type { NextPage } from "next";
import Image from "next/image";
import { CommonMeta, Page } from "~/components/common";

const Home: NextPage = () => {
  return (
    <Page>
      <CommonMeta />
      <h2>Welcome</h2>
      <Image
        src="/images/pets.png"
        width={239}
        height={170}
        alt="Pets"
        loading="eager"
      />
    </Page>
  );
};

export default Home;
