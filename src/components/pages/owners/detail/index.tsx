import { ShowOwnerData } from "~/components/organisms/showOwner";
import { Layout } from "~/components/templates/layout";

type Props = {
  oid: number;
};
export function Dom({ oid }: Props) {
  return (
    <Layout>
      <h2>Owner Information</h2>
      <ShowOwnerData oid={oid} />
    </Layout>
  );
}
