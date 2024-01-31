import type { GetServerSidePropsContext, NextPage } from "next";
import type { ComponentProps } from "react";
import { Dom } from "~/components/pages/visits/new";
import { CommonMeta } from "~/components/templates/meta";

type Props = ComponentProps<typeof Dom>;
const AddVisit: NextPage<Props> = ({ pid }) => {
  return (
    <>
      <CommonMeta />
      <Dom pid={pid} />
    </>
  );
};
export default AddVisit;

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const pid = parseInt(params.pid as string);
  const props: Props = {
    pid,
  };
  return { props };
}
