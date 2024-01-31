import { VetsTable } from "~/components/molecules/vets";
import { Layout } from "~/components/templates/layout";

type Props = {
  tableData: Array<{
    name: string;
    specialties: string;
  }>
};
export function Dom({ tableData }: Props) {
  return (
    <Layout>
      <h2>Veterinarians</h2>
      <VetsTable data={tableData} />
    </Layout>
  );
}
