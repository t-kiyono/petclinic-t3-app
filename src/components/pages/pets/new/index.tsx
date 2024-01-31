import { AddPetData } from "~/components/organisms/addPet";
import { Layout } from "~/components/templates/layout";

type Props = {
  oid: number;
};
export function Dom({ oid }: Props) {
  return (
    <Layout>
      <h2>New Pet</h2>
      <AddPetData oid={oid} />
    </Layout>
  );
}
