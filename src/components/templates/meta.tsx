import Head from "next/head";

export function CommonMeta({ title = "Petclinic", description = "This is Petclinic Application" }) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="icon" type="image/webp" href="/favicon.webp" />
    </Head>
  );
}
