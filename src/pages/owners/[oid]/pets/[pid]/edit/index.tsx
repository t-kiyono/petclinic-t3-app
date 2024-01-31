import type { GetServerSidePropsContext, NextPage } from "next";
import type { ComponentProps } from "react";
import { Dom } from "~/components/pages/pets/edit";
import { CommonMeta } from "~/components/templates/meta";

type Props = ComponentProps<typeof Dom>;
const EditPet: NextPage<Props> = ({ oid, pid }) => {
  return (
    <>
      <CommonMeta />
      <Dom oid={oid} pid={pid} />
    </>
  );
};
export default EditPet;

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const pid = parseInt(params.pid as string);
  const props: Props = {
    oid,
    pid,
  };
  return { props };
}
