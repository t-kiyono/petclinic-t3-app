import { EditPetData } from "~/components/organisms/editPet";
import { Layout } from "~/components/templates/layout";

type Props = {
  oid: number;
  pid: number;
};
export function Dom({ oid, pid }: Props) {
  return (
    <Layout>
      <h2>Pet</h2>
      <EditPetData oid={oid} pid={pid} />
    </Layout>
  );
}
