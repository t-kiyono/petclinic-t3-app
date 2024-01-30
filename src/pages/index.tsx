import type { NextPage } from "next";
import Image from "next/image";
import { CommonMeta, Page } from "~/components/common";
import { env } from "~/env.mjs";

const Home: NextPage = () => {
  return (
    <Page>
      <CommonMeta />
      <h2>Welcome</h2>
      <Image
        loader={({ src }) => `${env.NEXT_PUBLIC_CDN}${src}`}
        src="/assets/pets.png"
        width={239}
        height={170}
        alt="Pets"
        loading="eager"
      />
    </Page>
  );
};

export default Home;
