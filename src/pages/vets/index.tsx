import type { NextPage } from "next";
import { CommonMeta, Loader, Page } from "~/components/common";
import { VetsTable } from "~/components/vets";
import { api } from "~/utils/api";

const Vets: NextPage = () => {
  return (
    <Page>
      <CommonMeta />
      <h2>Veterinarians</h2>
      <VetsData />
    </Page>
  );
};

export default Vets;

function VetsData() {
  const { data, isLoading } = api.vets.list.useQuery();

  if (isLoading || !data) return <Loader />;

  const tableData = data.map(d => ({
    name: `${d.first_name ?? ""} ${d.last_name ?? ""}`,
    specialties: d.vet_specialties.map(vs => vs.specialties.name ?? "").join(" ")
  }));

  return <VetsTable data={tableData} />;
}
