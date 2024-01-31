import Image from "next/image";
import { Layout } from "~/components/templates/layout";
import { env } from "~/env.mjs";

export function Dom() {
  return (
    <Layout>
      <h2>Welcome</h2>
      <Image
        loader={({ src }) => `${env.NEXT_PUBLIC_CDN}${src}`}
        src="/assets/pets.png"
        width={239}
        height={170}
        alt="Pets"
        loading="eager"
      />
    </Layout>
  );
}
