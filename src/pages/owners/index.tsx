import type { GetServerSidePropsContext, NextPage } from "next";
import type { ComponentProps } from "react";
import { CommonMeta } from "~/components/templates/meta";
import { Dom } from "~/components/pages/owners";

type Props = ComponentProps<typeof Dom>;
const ListOwners: NextPage<Props> = ({ lastName }) => {
  return (
    <>
      <CommonMeta />
      <Dom lastName={lastName} />
    </>
  );
};
export default ListOwners;

export function getServerSideProps({ query }: GetServerSidePropsContext) {
  const props: Props = {
    lastName: query.lastName as string ?? ""
  };
  return { props };
}
