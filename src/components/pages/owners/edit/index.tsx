import { EditOwnerForm } from "~/components/organisms/editOwner";
import { Layout } from "~/components/templates/layout";

type Props = {
  oid: number;
};
export function Dom({ oid }: Props) {
  return (
    <Layout>
      <h2>Owner</h2>
      <EditOwnerForm oid={oid} />
    </Layout>
  );
}
