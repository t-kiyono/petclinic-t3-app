import type { GetServerSidePropsContext, NextPage } from "next";
import type { ComponentProps } from "react";
import { Dom } from "~/components/pages/owners/detail";
import { CommonMeta } from "~/components/templates/meta";

type Props = ComponentProps<typeof Dom>;
const ShowOwner: NextPage<Props> = ({ oid }) => {
  return (
    <>
      <CommonMeta />
      <Dom oid={oid} />
    </>
  );
};
export default ShowOwner;

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const props: Props = {
    oid,
  };
  return { props };
}
