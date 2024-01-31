import type { GetServerSidePropsContext, NextPage } from "next";
import type { ComponentProps } from "react";
import { Dom } from "~/components/pages/owners/edit";
import { CommonMeta } from "~/components/templates/meta";

type Props = ComponentProps<typeof Dom>;
const EditOwner: NextPage<Props> = ({ oid }) => {
  return (
    <>
      <CommonMeta />
      <Dom oid={oid} />
    </>
  );
};
export default EditOwner;

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const props: Props = {
    oid,
  };
  return { props };
}
